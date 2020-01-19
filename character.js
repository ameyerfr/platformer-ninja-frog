class Character {

   constructor(config) {

     this.name = config.name || 'anonymous';
     this.direction = 'right';
     this.jumping = false;
     this.x = 100;
     this.y = 200;
     this.height = 32;
     this.width = 32;
     this.speed_x = 0;
     this.speed_y = 0;
     this.speed = 1;
   }

   jump() {
     if(!this.jumping) {
       this.jumping = true;
       this.speed_y -= 20;
     }
   }

   moveLeft() { this.speed_x -= this.speed }
   moveRight() { this.speed_x += this.speed }

   update() {
     this.x = Math.round(this.x + this.speed_x)
     this.y = Math.round(this.y - this.speed_y)

     // If down on the ground
     if ( this.y <= 0 ) { this.jumping = false; }
   }

   render() {
     let player = document.getElementById('player');
     player.style.left = Math.floor(this.x) + 'px';
     player.style.bottom = Math.floor(this.y) + 'px';
   }

}
