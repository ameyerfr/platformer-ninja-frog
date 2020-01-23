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

  let froggy = new Character({
    name:'froggy',
    hurtbox : {
      top:12,
      left:16,
      width:30,
      height:50
    },
    zIndex:10
  });

  let mushroom1 = new Character({
    name:'mushroom',
    hurtbox : {
      top:24,
      left:16,
      width:32,
      height:38
    },
    initialPosition:{left:520, bottom:0},
    botMove:{goLeft:150, goRight:150, offset:300, firstMove:'right'},
    reverseSpriteDir:true,
    jumpHeight:15
  });

  let mushroom2 = new Character({
    name:'mushroom',
    hurtbox : {
      top:24,
      left:16,
      width:32,
      height:38
    },
    initialPosition:{left:250, bottom:250},
    botMove:{goLeft:70, goRight:70, offset:140, firstMove:'left'},
    reverseSpriteDir:true,
    jumpHeight:15
  });

  let mushroom3 = new Character({
    name:'mushroom',
    hurtbox : {
      top:24,
      left:16,
      width:32,
      height:38
    },
    initialPosition:{left:300, bottom:400},
    botMove:{goLeft:70, goRight:70, offset:140, firstMove:'right'},
    reverseSpriteDir:true,
    jumpHeight:15
  });

  window.game.generateGroundTiles();

  window.game.generateObstacles([
    {type:'hardblock-v',  left:250, bottom:0},

    {type:'hardblock-h',  left:0, bottom:120},
    {type:'hardblock-h',  left:96, bottom:152},
    {type:'hardblock-h',  left:192, bottom:184},
    {type:'hardblock-h',  left:286, bottom:184},
    {type:'hardblock-h',  left:380, bottom:184},
    {type:'hardblock-32',  left:380, bottom:214},

    {type:'hardblock-32',  left:608, bottom:184},
    {type:'hardblock-h',  left:638, bottom:184},

    {type:'hardblock-h',  left:0, bottom:350},
    {type:'hardblock-32',  left:64, bottom:380},
    {type:'hardblock-32',  left:188, bottom:380},
    {type:'hardblock-h',  left:188, bottom:350},
    {type:'hardblock-h',  left:282, bottom:350},
    {type:'hardblock-h',  left:374, bottom:350},
    {type:'hardblock-v',  left:438, bottom:380},
    {type:'hardblock-64',  left:468, bottom:412},

    {type:'hardblock-64',  bottom:0, right:0},

    {id:99, type:'platform',     h:10, w:96, left:650, bottom:350, animate:{keys:[{transform:'translateX(-50px)'},{transform:'translateX(50px)'}], duration:2000} },
    {id:99, type:'platform',     h:10, w:96, left:750, bottom:450, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:3000} },
    {id:99, type:'platform',     h:10, w:96, left:550, bottom:480, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:4000} }
  ])

  // VERY START - ON SCREEN CLICK
  // THIS IS SO THAT THE BROWSER DOESNT INTERCEPT THE SOUND
  document.body.addEventListener("click", function () {

    // Avoid multiple clicks
    if(windowclicked) { return; }
    windowclicked = true;

    game.displayStartSplash();

  });

  document.getElementById('sb1').addEventListener("click", function () {
    game.hideStartSplash();
    document.getElementById('life-container').style.visibility = 'visible';
    game.sound.playSound("menuclick");
    startThisDamnGame();
  });

  function startThisDamnGame () {

    window.game.generateItems([
      { type:'shuriken', left: 150, bottom: 10 },
      { type:'shuriken', left: 350, bottom: 10 },
      { type:'shuriken', left: 800, bottom: 10 },
      { type:'shuriken', left: 40, bottom: 160 },
      { type:'shuriken', left: 750, bottom: 380 },
      { type:'shuriken', left: 850, bottom: 500 },
      { type:'shuriken', left: 20, bottom: 400 }
    ])

    window.game.addPlayer(froggy);
    window.game.addEnemy(mushroom1);
    window.game.addEnemy(mushroom2);
    window.game.addEnemy(mushroom3);

    window.game.generateLifes();

    game.sound.playSound("theme");
    window.game.init();

  }

}
