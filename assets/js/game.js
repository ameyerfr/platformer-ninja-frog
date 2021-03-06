class Game {

  constructor() {
    this.running = true;
    this.playerMaxLifes = 5;
    this.lifesDOMContainer = document.getElementById('lifes');
    this.world = {
      DOMcontainer : document.getElementById('map-container'),
      gravity : 1.5,
      friction : 0.85,
      player : null,
      enemies : [],
      obstacles : [],
      items : []
    };

    this.controls = {
      left  : { active : false, pressed : false },
      right : { active : false, pressed : false },
      jump  : { active : false, pressed : false }
    };

    this.groundElement    = document.getElementById('ground');
    this.overlayDOMEl     = document.getElementById('overlay');
    this.splashStartDOMEl = document.getElementById('splash-start');
    this.splashEndDOMEl = document.getElementById('splash-end');
  }

  controlsHandler(e) {

    let pressed = (e.type === "keydown") ? true : false;

    switch (e.code) {
      case 'ArrowLeft'  : this.updateControls('left', pressed); break;
      case 'ArrowRight' : this.updateControls('right', pressed); break;
      case 'Space'      : this.updateControls('jump', pressed); break;
      case 'ArrowUp'    : this.updateControls('jump', pressed); break;
    }

  }

  updateControls(control, pressed) {
    let controlObj = this.controls[control];
    if(controlObj.pressed != pressed) controlObj.active = pressed;
    controlObj.pressed = pressed;
  }

  getWorldHeight() {
    return this.world.DOMcontainer.getBoundingClientRect().height;
  }

  getWorldWidth() {
    return this.world.DOMcontainer.getBoundingClientRect().width;
  }

  collideObjectWithWorld(object) {
    let worldHeight = this.getWorldHeight();
    let worldWidth = this.getWorldWidth();

    /**
     * WORLD BOUNDARIES
     */
    // Out of boundaries on the left
    if (object.x < 0) { object.x = 0; object.speed_x = 0; }
    // Out of boundaries on the right
    else if (object.x + object.width > worldWidth) { object.x = worldWidth - object.width; object.speed_x = 0; }

    // Out of boundaries on the top
    if (object.y < 0) { object.y = 0; object.speed_y = 0;}
    // Out of boundaries on the bottom
    else if (object.y + object.height > worldHeight) { object.jumping = false; object.y = worldHeight - object.height; object.speed_y = 0; }
  }

  //
  // Collide a Character type object with all the obstacles in the world
  //
  collideCharWithObstacle(source_obj, obstacle) {

    let obstacleRects = obstacle.getRects();
    let object = source_obj.getHurtBoxCoordinates();

    let rect1 = object;
    let rect2 = obstacleRects;

    // THERE IS AABB Collision
    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {

         let old_object_bottom = object.y_old + object.height;
         let object_bottom = object.y + object.height;
         let obstacle_bottom = obstacleRects.y + obstacleRects.height;

         let old_object_right = object.x_old + object.width;
         let object_right = object.x + object.width;
         let obstacle_right = obstacleRects.x + obstacleRects.width

         let old_object_left = object.x_old;
         let object_left = object.x;
         let obstacle_left = obstacleRects.x;

         let old_object_top = object.y_old;
         let object_top = object.y;
         let obstacle_top = obstacleRects.y;


         if (obstacle.collision.top &&
             object_bottom > obstacle_top &&
             old_object_bottom <= obstacle_top) {
               // console.log("COLLISION - BOTTOM player with TOP obstacle");

               source_obj.setHurtboxCoordinates({
                 y : obstacle_top - object.height - 1, // -1 for collision safety (avoid bugs)
                 speed_y : 0,
                 jumping : false
               })

               return; // BREAK to avoid weird behaviors when walking on tiles
                       // TODO : fix bug when walking on tiles from right to left
         }

         if (obstacle.collision.left &&
             object_right > obstacle_left &&
             old_object_right <= obstacle_left) {
               // console.log("COLLISION - RIGHT player with LEFT obstacle")

               source_obj.setHurtboxCoordinates({
                 x : obstacle_left - object.width - 1, // -1 for collision safety (avoid bugs)
                 speed_x : 0
               })
         }

         if (obstacle.collision.right &&
             object_left < obstacle_right &&
             old_object_left >= obstacle_right) {
               // console.log("COLLISION - LEFT player with RIGHT obstacle")

               source_obj.setHurtboxCoordinates({
                 x : obstacle_right + 1, // +1 for collision safety (avoid bugs)
                 speed_x : 0
               })
         }

         if (obstacle.collision.bottom &&
             object_top < obstacle_bottom &&
             old_object_top >= obstacle_bottom) {
               // console.log("COLLISION - TOP player with BOTTOM obstacle")

               source_obj.setHurtboxCoordinates({
                 y : obstacle_bottom,
                 speed_y : 0
               })
         }

    } // end of AABB collision

  }

  collidePlayerWithEnemies(player, enemies) {

    let playerRects = player.getHurtBoxCoordinates();

    let old_player_bottom = playerRects.y_old + playerRects.height;
    let player_bottom = playerRects.y + playerRects.height;

    this.world.enemies.forEach(enemy => {

      let enemyRects = enemy.getHurtBoxCoordinates();
      let enemy_top = enemyRects.y;

      if ( player.isColliding(enemy, 'character') ) {

        // Colliding enemy on its top => JUMP !
        if ( player_bottom > enemy_top && old_player_bottom <= enemy_top) {

          player.setHurtboxCoordinates({
            speed_y : -50,
            jumping : true
          })

          this.sound.playSound("mushjump");

        // ELSE, touch enemy => dmg !
        } else {
          if (!player.stillHurting()) {
            player.getHurt(1);
            this.removeALife();
            this.sound.playSound("hurt");
          }
        }

      }
    })

  }

  collideCharWithItem(player, item) {
    if ( !item.hidden && player.isColliding(item, 'item') ) {
      item.isGrabbed();
      this.totalItemsGrabbed++;
      this.sound.playSound("pickitem");
    }
  }

  updateWorld() {

    let allCharacters = [this.world.player, ...this.world.enemies];

    // Update each character with gravity and friction
    // Handle collision with world boundaries
    allCharacters.forEach(character => {
      character.speed_y += this.world.gravity;
      character.update();

      character.speed_x *= this.world.friction;
      character.speed_y *= this.world.friction;

      this.collideObjectWithWorld(character);
    })

    // Collide player with all the enemies of the world
    this.collidePlayerWithEnemies(this.world.player);

    // Collide all characters of the world (player and enemies)
    // With all the obstacles of the world
    allCharacters.forEach(character => {

      // Each character with each obstacle
      this.world.obstacles.forEach(obstacle => {
        this.collideCharWithObstacle(character, obstacle)
      });

    });

    // Collide Player with all the items of the world
    this.world.items.forEach(item => {
      this.collideCharWithItem(this.world.player, item)
    });

  }

  renderWorld() {
    // render world changes here

    // render player
    this.world.player.render();

    // render Enemies
    this.world.enemies.forEach(enemy => enemy.render())
  }

  resolveGoal() {

    // If all objects have been grabbed
    if ( this.totalItemsGrabbed && this.totalItemsGrabbed >= this.totalItems ) {
      this.stopGameLoop();
      this.endScreen(true);
    }

    if ( this.world.player.life <= 0 ) {
      this.stopGameLoop();
      this.endScreen(false);
    }
  }

  gameLoop(timestamp) {

    // Reset player state
    this.world.player.resetState();

    // Reset enemies state
    this.world.enemies.forEach(enemy => enemy.resetState())

    if ( this.controls.left.active )  { this.world.player.moveLeft() }
    if ( this.controls.right.active ) { this.world.player.moveRight() }
    if ( this.controls.jump.active )  {
      this.world.player.jump();
      this.controls.jump.active = false;
      this.sound.playSound("frogjump");
    }

    this.updateWorld();
    this.renderWorld();
    this.resolveGoal();

    if (this.running) {

      // Limited FPS
      this.currentTimeoutId = setTimeout(this.currentLoopId = requestAnimationFrame((timestamp) => {
        this.gameLoop(timestamp);
      }), 1000/30)

      // Maximum FPS
      // this.currentLoopId = requestAnimationFrame((timestamp) => {
      //   this.gameLoop(timestamp);
      // })

    }

  }

  addPlayer(character) {
    this.world.player = character;

    // Set his Life
    this.world.player.life = this.playerMaxLifes;

    // Set player initial position in world
    character.setInitialPosition(this.getWorldHeight(), this.getWorldWidth())

    this.world.DOMcontainer.appendChild(character.DOMcontainer);
  }

  addEnemy(enemy) {
    this.world.enemies.push(enemy)

    // Set enemy initial position in world
    enemy.setInitialPosition(this.getWorldHeight(), this.getWorldWidth())

    this.world.DOMcontainer.appendChild(enemy.DOMcontainer);

    // If enemy has bot moves to make, launch bot mode
    if (enemy.botMove) { enemy.launchBotMode() }

  }

  listenToControls() {
    window.onkeydown = this.controlsHandler.bind(this);
    window.onkeyup   = this.controlsHandler.bind(this);
  }

  // Called by the init()
  generateGroundTiles() {
    let worldWidth = this.getWorldWidth();
    let numberOfTiles = Math.ceil(worldWidth/44)

    for(let i = 0; i <= numberOfTiles; i++) {
      let t = document.createElement('div')
      t.setAttribute('id', `groundTile-${i}`);
      t.className = 'ground-tile';
      t.style.position = 'absolute';
      t.style.left = `${i * 44}px`;
      this.groundElement.appendChild(t);
    }

  }

  // Called by the init
  generateLifes() {
    for (let i = 0; i < this.playerMaxLifes; i++) {
      let el = document.createElement('div');
      el.className = "heart";
      this.lifesDOMContainer.appendChild(el);
    }
    this.lifesDOMContainer.style.visibility = 'visible';
  }

  removeALife() {
    let lifeNode = this.lifesDOMContainer.lastChild;
    if ( lifeNode ) { lifeNode.remove() }
  }

  displayStartSplash() {

    this.overlayDOMEl.style.display = "flex";
    this.overlayDOMEl.innerHTML = "";

    this.splashStartDOMEl.querySelector('#st1').style.visibility = 'visible';
    this.sound.playSound("shortbang");

    setTimeout(() => {
      this.splashStartDOMEl.querySelector('#st2').style.visibility = 'visible';
      this.sound.playSound("shortbang2");
    }, 800)

    setTimeout(() => {
      this.splashStartDOMEl.querySelector('#st3').style.visibility = 'visible';
      this.sound.playSound("shortbang");
    }, 1600)

    setTimeout(() => {
      this.splashStartDOMEl.querySelector('#button-play').style.visibility = 'visible';
      this.sound.playSound("shortbang2");
    }, 2400)
  }

  hideStartSplash() {
    this.overlayDOMEl.style.display = 'none';
    this.splashStartDOMEl.style.display = 'none';
  }

  displayEndSplash(youWin) {
    this.overlayDOMEl.style.display = "flex";
    this.overlayDOMEl.innerHTML = "";

    this.splashEndDOMEl.querySelector('#se2').innerHTML = youWin ? 'WIN' : 'LOSE';

    this.splashEndDOMEl.querySelector('#se1').style.visibility = 'visible';
    this.sound.playSound("shortbang");

    setTimeout(() => {
      this.splashEndDOMEl.querySelector('#se2').style.visibility = 'visible';
      this.sound.playSound("shortbang2");
    }, 800)

    setTimeout(() => {
      this.splashEndDOMEl.querySelector('#button-playagain').style.visibility = 'visible';
      this.sound.playSound("shortbang");
    }, 1600)

  }

  hideSplashEnd() {
    this.overlayDOMEl.style.display = 'none';
    this.splashEndDOMEl.style.display = 'none';
  }

  /**
   * GENERATE A GAME - CALL #1
   */
  generateObstacles(obstacles) {

    obstacles.forEach(obstacle_config => {
      obstacle_config.parentEl = this.world.DOMcontainer;
      this.world.obstacles.push(new Obstacle(obstacle_config))
    })

  }

  /**
   * GENERATE A GAME - CALL #2
   */
  generateItems(items) {

    items.forEach(item_config => {
      item_config.parentEl = this.world.DOMcontainer;
      this.world.items.push(new Item(item_config))
    })

    document.getElementById('life-container').style.visibility = 'visible';

    this.totalItems = this.world.items.length;
    this.totalItemsGrabbed = 0;

  }

  /**
   * GENERATE A GAME - CALL #3
   */
  init() {

    this.sound.playSound("theme");

    requestAnimationFrame((timestamp) => {
      this.gameLoop(timestamp);
    })
  }

  stopGameLoop() {
    console.log("stopGameLoop !");

    this.running = false;

    if (this.currentTimeoutId) { clearTimeout(this.currentTimeoutId) }
    if (this.currentLoopId) { cancelAnimationFrame(this.currentLoopId) }

    // One last call
    // this.gameLoop(new Date().getTime, true);

  }

  endScreen(youWin) {
    this.sound.stopSound("theme");

    if (youWin) {
      this.displayEndSplash(youWin);
      this.sound.playSound("victory");
    } else {
      this.displayEndSplash(youWin);
      this.sound.playSound("gameover");
    }
  }

}
