let player = document.getElementById('player');

let playerPositionOnMAP = { left:0, bottom:0, reachedTop:false }

let spriteXPositions = [96,64,32] // Left - Middle - Right
let currentSpriteXPosition = 0;

let startTime;
let fps = 10;

let shuffleAnimation = null;
let shuffleTimeout = null;

let mvRightAnimation = null;
let mvRightTimeout = null;

let mvLeftAnimation = null;
let mvLeftTimeout = null;

let jumpAnimation = null;
let jumpTimeout = null;

function initializePlayer() {
  setPlayerState("resting");
  player.style.left = playerPositionOnMAP.left;
  player.style.bottom = playerPositionOnMAP.bottom;
}

function setPlayerState(state) {

  player.classList.remove("resting")

  if ( state !== "jump" ){
    player.classList.remove("goright")
    player.classList.remove("goleft")
  }

  player.classList.add(state)

  if ( player.classList.contains('resting') ) { player.style.backgroundPositionX = spriteXPositions[1] + "px" }
}

function getPlayerState() {
  return player.className;
}






function startShuffle() {
  if (shuffleAnimation !== null ) { return }

  requestAnimationFrame(function(timestamp){
    startTime = timestamp;
    shufflePlayer(timestamp);
  })
}
function shufflePlayer (timestamp) {
  shuffleTimeout = setTimeout(function(){

    player.style.backgroundPositionX = spriteXPositions[currentSpriteXPosition] + "px";

    if (getPlayerState() === "goright") {
      currentSpriteXPosition = currentSpriteXPosition === 2 ? 0 : currentSpriteXPosition + 1;
    } else if (getPlayerState() === "goleft") {
      currentSpriteXPosition = currentSpriteXPosition === 0 ? 2 : currentSpriteXPosition - 1;
    }

    shuffleAnimation = requestAnimationFrame(shufflePlayer);
  }, 1000/fps)
}
function stopShuffle() {
  clearTimeout(shuffleTimeout);
  cancelAnimationFrame(shuffleAnimation);
  shuffleTimeout = null;
  shuffleAnimation = null;
}






function playerMoveRight() {
  console.log("MOVE RIGHT")
  if (mvRightAnimation !== null) { return }

  setPlayerState("goright");

  requestAnimationFrame(makeMoveRight);
  startShuffle();
}
function makeMoveRight (timestamp) {
  mvRightTimeout = setTimeout(function(){
    playerPositionOnMAP.left += 1;
    player.style.left = playerPositionOnMAP.left + "px";
    mvRightAnimation = requestAnimationFrame(makeMoveRight);
  }, 1000 / (fps * 10))
}





function playerMoveLeft() {
  console.log("MOVE LEFT")
  if (mvLeftAnimation !== null) { return }

  setPlayerState("goleft");

  requestAnimationFrame(makeMoveLeft);
  startShuffle();
}
function makeMoveLeft (timestamp) {
  mvLeftTimeout = setTimeout(function(){
    playerPositionOnMAP.left -= 1;
    player.style.left = playerPositionOnMAP.left + "px";
    mvLeftAnimation = requestAnimationFrame(makeMoveLeft);
  }, 1000 / (fps * 10))
}



function playerJump() {

  // setPlayerState('jump');
  //
  // setTimeout(function(){
  //   player.classList.remove("jump")
  // },800)


  function jump(timestamp) {

    // jumpTimeout = setTimeout(function(){

      if (playerPositionOnMAP.reachedTop === false && playerPositionOnMAP.bottom <= 100) {
        playerPositionOnMAP.bottom += 5;
        if ( playerPositionOnMAP.bottom >= 100 ) { playerPositionOnMAP.reachedTop = true; }
      } else if (playerPositionOnMAP.bottom >= 5) {
        playerPositionOnMAP.bottom -= 5;
      }

      if (playerPositionOnMAP.bottom === 0) {
            playerPositionOnMAP.reachedTop = false;
            // clearTimeout(jumpTimeout);
            cancelAnimationFrame(jumpAnimation);
            jumpTimeout = null;
            jumpAnimation = null;
            return;
      }

      player.style.bottom = playerPositionOnMAP.bottom + "px";
      jumpAnimation = requestAnimationFrame(jump);

    // }, 10)

  }
  requestAnimationFrame(jump);

}




function pausePlayer() {
  console.log("PAUSE PLAYER")

  stopShuffle()

  if (mvRightAnimation) {

    clearTimeout(mvRightTimeout);
    cancelAnimationFrame(mvRightAnimation);
    mvRightTimeout = null;
    mvRightAnimation = null;

  } else if (mvLeftAnimation) {

    clearTimeout(mvLeftTimeout);
    cancelAnimationFrame(mvLeftAnimation);
    mvLeftTimeout = null;
    mvLeftAnimation = null;

  }

}




window.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32:
      playerJump()
      break;
    case 37:
      playerMoveLeft()
      break;
    case 39:
      playerMoveRight()
      break;
  }
}

window.onkeyup = function(e) {
  switch (e.keyCode) {
    case 32:
      // nothing
      break;
    case 37:
      pausePlayer()
      break;
    case 39:
      pausePlayer()
      break;
  }
}

window.onload = initializePlayer;

// document.getElementById('start').onclick = function () {
//   startShuffle();
// }
//
// document.getElementById('stop').onclick = function () {
//   stopShuffle();
// }
