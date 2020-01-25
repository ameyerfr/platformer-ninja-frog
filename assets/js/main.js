window.onload = function() {
  let windowclicked = false;

  window.game = new Game();

  window.game.sound = new SoundController({
    sounds:[
      { name : "theme", src : "assets/sound/mushroom-theme.mp3", loop:true, vol:0.5 },
      { name : "shortbang", src : "assets/sound/sfx_wpn_cannon2.wav" },
      // Same one so that we can overlap
      { name : "shortbang2", src : "assets/sound/sfx_wpn_cannon2.wav" },
      { name : "longbang", src : "assets/sound/sfx_exp_cluster1.wav" },
      { name : "menuclick", src : "assets/sound/sfx_menu_select2.wav" },
      { name : "pickitem", src : "assets/sound/sfx_coin_double7.wav" },
      { name : "frogjump", src : "assets/sound/sfx_movement_jump10.wav"},
      { name : "mushjump", src : "assets/sound/sfx_movement_jump8.wav" },
      { name : "hurt", src : "assets/sound/sfx_sounds_damage3.wav" },
      { name : "gameover", src : "assets/sound/gameover.ogg" },
      { name : "victory", src : "assets/sound/victory.mp3" }
    ]
  });

  window.game.generateGroundTiles();

  window.game.generateObstacles(gameConfig.obstacles);

  // VERY START - ON SCREEN CLICK
  // THIS IS SO THAT THE BROWSER DOESNT INTERCEPT THE SOUND
  document.body.addEventListener("click", function () {

    // Avoid multiple clicks
    if(windowclicked) { return; }
    windowclicked = true;

    // If game was reload from end splash
    // Dont show start splash
    let reloaded = new URL(window.location.href).searchParams.get("reload");
    if (reloaded) {
      window.game.overlayDOMEl.style.display = 'none';
      window.game.hideStartSplash();
      startThisDamnGame();
    } else {
      window.game.displayStartSplash();
    }

  });

  document.getElementById('button-play').addEventListener("click", function () {
    window.game.sound.playSound("menuclick");
    window.game.hideStartSplash();
    startThisDamnGame();
  });

  document.getElementById('button-playagain').addEventListener("click", function () {
    window.game.sound.playSound("menuclick");

    // When clicking play again
    let url = window.location.href;
    if (url.indexOf('?') === -1) { url += '?reload=1' }
    window.location.href = url;

  });

  function startThisDamnGame () {

    window.game.generateItems(gameConfig.items)

    let player = new Character(gameConfig.player);
    window.game.addPlayer(player);

    let ennemies = gameConfig.ennemies;
    ennemies.forEach(enemy => {
      window.game.addEnemy(new Character(enemy));
    })

    window.game.generateLifes();

    window.game.listenToControls();
    window.game.init();

  }

}
