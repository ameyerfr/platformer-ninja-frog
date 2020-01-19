let map = document.getElementById('map-container');
let player = document.getElementById('player');
let obstacles = map.querySelectorAll('.obstacle')

const keyState = {};
//  {ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false, Space: false}

const playerState = {
  x:0,
  y:0,
  direction:'idling', // resting - goleft - goright
  jumping:false,
  moving:false,
  blocked:false
}

const jumpHeight = 150;
const jumpSpeedUp = 5;
const jumpSpeedDown = 5;
const jumpRefreshSpeed = 10;
const gravityRate = 5;

window.onkeydown = function(e) {
  keyState[e.code] = true;
};
window.onkeyup = function(e) {
  keyState[e.code] = false;
};




function initializePlayer() {
  requestAnimationFrame(gameLoop)
}

function gameLoop(timestamp) {
  playerState.moving = false;

  if(keyState["ArrowRight"]) makeMove('goright')
  if(keyState["ArrowLeft"]) makeMove('goleft')
  if(keyState["Space"] && !playerState.jumping) {
    jump(playerState.y + jumpHeight)
  }

  applyGravity();

  updatePlayerState();

  isAnyObstacleColliding();

  requestAnimationFrame(gameLoop)
}

function applyGravity() {

  let distFromFloor = howFarFromFloor();

  if (isAnyObstacleColliding(true)) {
      console.log("GOING TO COLLIDE NEXT PIXEL");
      return;
  }


  if ( distFromFloor > gravityRate && !playerState.jumping  && !playerState.blocked) {
    console.log("Dist from floor : " + distFromFloor + " remove 1 from y ! ");
    playerState.y -= gravityRate;
  }
}

function makeMove(move) {
  playerState.moving = true;

  if ( move === 'goright' ) {
    goRight()
  } else if ( move === 'goleft') {
    goLeft()
  }

  playerState.direction = move;

}

function goLeft() {
  if (playerState.blocked && playerState.direction === 'goleft' ) { return; }
  playerState.x -= 1;
}

function goRight() {
  if (playerState.blocked && playerState.direction === 'goright') { return; }
  playerState.x += 1;
}

function jump (target) {
  playerState.jumping = true;

  if (playerState.y < target) {
    playerState.y += jumpSpeedUp;
    setTimeout(jump, jumpRefreshSpeed);
  } else {
    // playerState.y = playerState.y + 1;
    playerState.jumping = false
    // fall()
  }
}

function fall() {

  if (playerState.blocked && playerState.jumping) {
    playerState.y = playerState.y + 1;
    playerState.jumping = false
    return;
  }

  playerState.y -= jumpSpeedDown;

  if (playerState.y > 0) {
    setTimeout(fall, jumpRefreshSpeed)
  } else {
    playerState.jumping = false
  }
}

function updatePlayerState() {
  // Clear all classes each loop
  player.className = ""

  // class ".moving" or not
  if (playerState.moving) { player.classList.add('moving') }
  else { player.classList.add('idling') }
  
  // add class based on direction
  player.classList.add(playerState.direction)

  player.style.left = playerState.x + 'px';
  player.style.bottom = playerState.y + 'px';
}

function howFarFromFloor() {
  let mapRects = map.getBoundingClientRect()
  let playerRect = player.getBoundingClientRect()
  return mapRects.bottom - playerRect.bottom;
  // isColliding(player.getBoundingClientRect(), map.getBoundingClientRect(), false, 'MAP')
}

function isObstacleGoingtoColide() {
  let playerRects = player.getBoundingClientRect();
  let obstacleRects = document.getElementById('obstacle').getBoundingClientRect();
  playerRects.y = playerRects.y + 1;

  return isColliding(playerRects, obstacleRects, 'Obstacle')

}

function isAnyObstacleColliding(isGoingToCollide) {
  let playerRects = player.getBoundingClientRect();
  if ( isGoingToCollide ) { playerRects.y = playerRects.y + 1 }

  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    let thereIsCollision = isColliding(playerRects,
                                       obstacle.getBoundingClientRect(),
                                       'Obstacle id : ' + obstacle.id)
    if ( thereIsCollision ) return;
  }

}

function isColliding(rect1, rect2, collisionName) {
  // let rect1 = el1.getBoundingClientRect();
  // let rect2 = el2.getBoundingClientRect();

  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y) {

      console.log("COLLIDING - " + collisionName);

      playerState.blocked = true;
      return true;

  } else {
    playerState.blocked =  false
    return  false;
  }

}

window.onload = initializePlayer;
