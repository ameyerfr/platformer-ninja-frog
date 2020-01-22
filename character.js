class Character {

   constructor(config) {
     this.name = config.name || 'anonymous';
     this.baseStates = [];
     this.currentStates = [];
     this.direction = 'right';
     this.life = config.life || 1;
     this.jumping = false;
     this.x_old = 0;
     this.y_old = 0;
     this.x = 0;
     this.y = 0;
     this.height = 64;
     this.width = 64;
     this.speed_x = 0;
     this.speed_y = 0;
     this.jumpHeight = config.jumpHeight || 40; // 30 max to be less than tile size (32px) ?
     this.hurtboxOffsets = config.hurtbox;
     this.initialPosition = config.initialPosition || {left:0, bottom:0}
     this.botMove = config.botMove || false;

     this.baseStates.push('character');
     this.baseStates.push(config.name);
     if (config.reverseSpriteDir) { this.baseStates.push('reverseprite') }

     this.DOMcontainer = this.initialRender(config);

   }

   setInitialPosition(worldHeight, worldWidth) {

     if (this.initialPosition.hasOwnProperty('left'))   { this.x = this.initialPosition.left }
     if (this.initialPosition.hasOwnProperty('right'))  { this.x = worldWidth - this.width - this.initialPosition.right }
     if (this.initialPosition.hasOwnProperty('top'))    { this.y = this.initialPosition.top }
     if (this.initialPosition.hasOwnProperty('bottom')) { this.y = worldHeight - this.height - this.initialPosition.bottom }

   }

   resetState() {
     this.currentStates = [...this.baseStates];
   }

   // Called each game loop #1
   jump() {
     if(!this.jumping) {
       this.jumping = true;
       this.speed_y -= this.jumpHeight;
     }
   }

   // Called each game loop #1
   moveLeft() {
     this.direction = 'left';
     this.currentStates.push('moving');
     this.speed_x -= 1
   }

   // Called each game loop #1
   moveRight() {
     this.direction = 'right';
     this.currentStates.push('moving');
     this.speed_x += 1
   }

   // Called each game loop #2
   update() {
     // this.x = Math.round(this.x + this.speed_x)
     // this.y = Math.round(this.y - this.speed_y)

     this.x_old = this.x;
     this.y_old = this.y;

     this.x += this.speed_x;
     this.y += this.speed_y;

     // If still jumping
     if ( this.jumping ) { this.currentStates.push('jumping') }

     // If down on the ground
     // if ( this.y <= 0 ) { this.jumping = false; }
   }

   // Called each game loop #3
   render() {
     // Reset all css classes
     this.DOMcontainer.className = '';

     // default behavior
     if ( this.currentStates.length === this.baseStates.length ) { this.currentStates.push('idling') }

     // Always put the direction so character faces the right way
     this.currentStates.push(this.direction);

     // Loop on actions to add css classes
     this.currentStates.forEach(action => {
       this.DOMcontainer.classList.add(action)
     })

     // Update character position in the DOM
     this.DOMcontainer.style.left = this.x + 'px';
     this.DOMcontainer.style.top = this.y + 'px';
   }

   initialRender(config) {
     let charContainer = document.createElement('div');
     // charContainer.setAttribute('id', `${this.name}-container`)

     charContainer.style.position = 'absolute';
     charContainer.style.height = this.height + 'px';
     charContainer.style.width = this.width + 'px';
     charContainer.style.zIndex = config.zIndex || 2;
     charContainer.className = 'character idling right';
     charContainer.innerHTML = '<div class="hurtbox"></div>';
     return charContainer;
   }

   /**
    * get Hurtbox newCoordinates
    * wich are the character newCoordinates
    * with the hurtbox offsets
    */
   getHurtBoxCoordinates() {
     return {
       x:this.x + this.hurtboxOffsets.left,
       y:this.y + this.hurtboxOffsets.top,
       x_old:this.x_old + this.hurtboxOffsets.left,
       y_old:this.y_old + this.hurtboxOffsets.top,
       width:this.hurtboxOffsets.width,
       height:this.hurtboxOffsets.height
     }
   }

   /**
    * set the character coordinates, speed and jumping state
    * based on new Hurtbox
    * (accounting for the hurtbox offset)
    */
   setHurtboxCoordinates(newCoordinates) {
     let assignObj = {}
     if (newCoordinates.hasOwnProperty('x'))       { assignObj.x = newCoordinates.x - this.hurtboxOffsets.left  }
     if (newCoordinates.hasOwnProperty('y'))       { assignObj.y = newCoordinates.y - this.hurtboxOffsets.top  }
     if (newCoordinates.hasOwnProperty('speed_x')) { assignObj.speed_x = newCoordinates.speed_x }
     if (newCoordinates.hasOwnProperty('speed_y')) { assignObj.speed_y = newCoordinates.speed_y }
     if (newCoordinates.hasOwnProperty('jumping')) { assignObj.jumping = newCoordinates.jumping }
     Object.assign(this, assignObj);
   }

   // Is this character colliding with another char / item ?
   isColliding(object, typeOfCollision) {
       let obstacle;
       let character = this.getHurtBoxCoordinates();

     if (typeOfCollision === 'character') {
       obstacle  = object.getHurtBoxCoordinates();
     } else if (typeOfCollision === 'item') {
       obstacle  = object.getRects();
     }

     // THERE IS AABB Collision
     if (character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x &&
        character.y < obstacle.y + obstacle.height &&
        character.height + character.y > obstacle.y) {
        return true;
     }

     return false;
   }

   launchBotMode() {

     this.direction = this.botMove.firstMove === 'right' ? 'right' : 'left';

     setInterval(function(){
       if ( !this.intervalLeft && this.direction === 'left') {
         this.botMoveLeft();
       } else if ( !this.intervalRight && this.direction === 'right') {
         this.botMoveRight();
       }
     }.bind(this), 10)

   }

   botMoveLeft() {
     let targetX;
     let originalX = Math.round(this.x);

     if ( this.botMove.firstMove ) {
       targetX   = originalX - this.botMove.goLeft;
       this.botMove.firstMove = false;
     } else {
       targetX   = originalX - this.botMove.offset;
     }

     this.intervalLeft = setInterval((function() {
       if ( this.x <= targetX ) {
         clearInterval(this.intervalLeft);
         this.intervalLeft = null;
         this.direction = 'right';
         return;
       }
       this.moveLeft();
     }).bind(this), 100)

   }

   botMoveRight() {
     let targetX;
     let originalX = Math.round(this.x);

     if ( this.botMove.firstMove ) {
       targetX   = originalX + this.botMove.goRight;
       this.botMove.firstMove = false;
     } else {
       targetX   = originalX + this.botMove.offset;
     }

     this.intervalRight = setInterval((function() {
       if ( this.x >= targetX ) {
         clearInterval(this.intervalRight);
         this.intervalRight = null;
         this.direction = 'left';
         return;
       }
       this.moveRight();
     }).bind(this), 100)

   }

}
