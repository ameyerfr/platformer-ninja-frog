window.onload = function() {
  // let map = document.getElementById('map-container');
  // let player = document.getElementById('player');
  // let hurtBox = document.getElementById('player-hurtbox');
  // let obstacles = map.querySelectorAll('.obstacle');

  window.game = new Game();

  let froggy = new Character({
    name:'froggy',
    life: 3,
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

  window.game.generateItems([
    { type:'apple', left: 150, bottom: 10 },
    { type:'apple', left: 350, bottom: 10 },
    { type:'apple', left: 800, bottom: 10 },
    { type:'apple', left: 40, bottom: 160 },
    { type:'apple', left: 750, bottom: 400 },
    { type:'apple', left: 850, bottom: 500 },
    { type:'apple', left: 40, bottom: 400 }
  ])

  window.game.addPlayer(froggy);
  window.game.addEnemy(mushroom1);
  window.game.addEnemy(mushroom2);
  window.game.addEnemy(mushroom3);

  window.game.init();
}
