window.onload = function() {
  let map = document.getElementById('map-container');
  let player = document.getElementById('player');
  let hurtBox = document.getElementById('player-hurtbox');
  let obstacles = map.querySelectorAll('.obstacle');

  window.game = new Game();
  game.init();
}
