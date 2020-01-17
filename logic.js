let player = document.getElementById('player');

const keyState = {};
//  {ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false, Space: false}

const playerState = {
  x:0,
  y:0,
  direction:'resting', // resting - goleft - goright
  jumping:false,
  moving:false,
  blocked:false
}

const jumpHeight = 100;
const jumpSpeedUp = 10;
const jumpSpeedDown = 5;
const jumpRefreshSpeed = 10;

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
    jump()
  }

  updatePlayerState();

  isColliding();

  requestAnimationFrame(gameLoop)
}

function makeMove(move) {
  playerState.moving = true;
  playerState.direction = move;

  if ( move === 'goright' ) {
    goRight()
  } else if ( move === 'goleft') {
    goLeft()
  }

}

function goLeft() {
  playerState.x -= 1;
}

function goRight() {
  playerState.x += 1;
}

function jump () {
  playerState.jumping = true;

  if (playerState.y < jumpHeight) {
    playerState.y += jumpSpeedUp;
    setTimeout(jump, jumpRefreshSpeed);
  } else {
    fall()
  }
}

function fall() {
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

  // add class based on direction
  player.classList.add(playerState.direction)

  player.style.left = playerState.x + 'px';
  player.style.bottom = playerState.y + 'px';
}

function isColliding() {
  let rect1 = player.getBoundingClientRect();
  let rect2 = document.getElementById('obstacle').getBoundingClientRect();

  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y) {

      // collision détectée !
      console.log("COLLIDING !!!");

      playerState.blocked = true;
      return true;
  } else {
    playerState.blocked = false;
    return false;
  }

}

window.onload = initializePlayer;
