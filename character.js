class Character {

   constructor(config) {
     this.name = config.name || 'anonymous';
     this.currentActions = [];
     this.direction = 'right';
     this.jumping = false;
     this.x = 0;
     this.y = 50;
     this.height = 32;
     this.width = 32;
     this.speed_x = 0;
     this.speed_y = 0;

     this.DOMcontainer = this.initialRender();
   }

   // Called each game loop #1
   jump() {
     if(!this.jumping) {
       this.jumping = true;
       this.speed_y -= 20;
     }
   }

   // Called each game loop #1
   moveLeft() {
     this.direction = 'left';
     this.currentActions.push('moving');
     this.speed_x -= 1
   }

   // Called each game loop #1
   moveRight() {
     this.direction = 'right';
     this.currentActions.push('moving');
     this.speed_x += 1
   }

   // Called each game loop #2
   update() {
     this.x = Math.round(this.x + this.speed_x)
     this.y = Math.round(this.y - this.speed_y)

     // If still jumping
     if ( this.jumping ) { this.currentActions.push('jumping') }

     // If down on the ground
     if ( this.y <= 0 ) { this.jumping = false; }
   }

   // Called each game loop #3
   render() {

     // Reset all css classes
     this.DOMcontainer.className = '';

     // default behavior
     if ( this.currentActions.length === 0 ) { this.currentActions = ['idling'] }

     // Always put the direction so character faces the right way
     this.currentActions.push(this.direction);

     // Loop on actions to add css classes
     this.currentActions.forEach(action => {
       this.DOMcontainer.classList.add(action)
     })

     // Update character position in the DOM
     this.DOMcontainer.style.left = Math.floor(this.x) + 'px';
     this.DOMcontainer.style.bottom = Math.floor(this.y) + 'px';
   }

   initialRender() {
     let charContainer = document.createElement('div');
     charContainer.setAttribute('id', `${this.name}-container`)

     charContainer.style.position = 'absolute';
     charContainer.style.height = this.height + 'px';
     charContainer.style.width = this.width + 'px';
     charContainer.className = 'idling right';
     charContainer.innerHTML = '<div class="hurtbox"></div>';
     return charContainer;
   }

}
