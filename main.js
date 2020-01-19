window.onload = function() {
  // let map = document.getElementById('map-container');
  // let player = document.getElementById('player');
  // let hurtBox = document.getElementById('player-hurtbox');
  // let obstacles = map.querySelectorAll('.obstacle');

  let game = new Game();
  let character = new Character({name:'froggy'})
  game.addCharacter(character);
  game.init();
}
