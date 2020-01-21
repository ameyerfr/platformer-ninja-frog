class Character {

   constructor(config) {
     this.name = config.name || 'anonymous';
     this.baseStates = [];
     this.currentStates = [];
     this.direction = 'right';
     this.jumping = false;
     this.x_old = 0;
     this.y_old = 0;
     this.x = 0;
     this.y = 0;
     this.height = 64;
     this.width = 64;
     this.speed_x = 0;
     this.speed_y = 0;
     this.jumpHeight = config.jumpHeight || 50;
     this.hurtboxOffsets = config.hurtbox;

     this.baseStates.push('character');
     this.baseStates.push(config.name);
     if (config.reverseSpriteDir) { this.baseStates.push('reverseprite') }

     this.DOMcontainer = this.initialRender(config);
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
     charContainer.setAttribute('id', `${this.name}-container`)

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
    * set the character coordinates, speed and jumping keyState
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

   isColliding(otherChar) {

     let character = this.getHurtBoxCoordinates();
     let obstacle  = otherChar.getHurtBoxCoordinates();

     // THERE IS AABB Collision
     if (character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x &&
        character.y < obstacle.y + obstacle.height &&
        character.height + character.y > obstacle.y) {
        return true;
     }

     return false;
   }

}
