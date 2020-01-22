window.onload = function() {
  // let map = document.getElementById('map-container');
  // let player = document.getElementById('player');
  // let hurtBox = document.getElementById('player-hurtbox');
  // let obstacles = map.querySelectorAll('.obstacle');

  window.game = new Game();

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

  let mushroom = new Character({
    name:'mushroom',
    hurtbox : {
      top:24,
      left:16,
      width:32,
      height:40
    },
    initialPosition:{left:500, bottom:0},
    botMove:{goLeft:100, goRight:100, offset:200, firstMove:true},
    reverseSpriteDir:true,
    jumpHeight:15
  });

  let mushroom2 = new Character({
    name:'mushroom',
    hurtbox : {
      top:24,
      left:16,
      width:32,
      height:40
    },
    initialPosition:{left:300, bottom:250},
    botMove:{goLeft:100, goRight:100, offset:200, firstMove:true},
    reverseSpriteDir:true,
    jumpHeight:15
  });

  window.game.generateObstacles([
    {id:1, type:'hardblock-h',  left:0, bottom:120},
    {id:2, type:'hardblock-h',  left:96, bottom:152},
    {id:3, type:'hardblock-v',  left:250, bottom:0},
    {id:4, type:'hardblock-h',  left:192, bottom:184},
    {id:5, type:'hardblock-h',  left:288, bottom:184},
    {id:6, type:'hardblock-h',  left:384, bottom:184},
    {id:7, type:'hardblock-h',  left:384, bottom:184},
    {id:8, type:'hardblock-32',  left:608, bottom:184},
    {id:9, type:'hardblock-h',  left:0, bottom:350},
    {id:10, type:'hardblock-h',  left:96, bottom:350},
    {id:11, type:'hardblock-h',  left:192, bottom:350},
    {id:12, type:'hardblock-h',  left:288, bottom:350},
    {id:13, type:'hardblock-h',  left:384, bottom:350},
    {id:14, type:'hardblock-v',  left:448, bottom:382},
    {id:15, type:'hardblock-64',  left:478, bottom:414},

    {id:99, type:'platform',     h:10, w:96, left:650, bottom:350, animate:{keys:[{transform:'translateX(-50px)'},{transform:'translateX(50px)'}], duration:2000} },
    {id:99, type:'platform',     h:10, w:96, left:750, bottom:450, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:3000} },
    {id:99, type:'platform',     h:10, w:96, left:550, bottom:480, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:4000} }
  ])

  window.game.generateItems([
    { type:'apple', left: 150, bottom: 10 },
    { type:'apple', left: 350, bottom: 10 },
    { type:'apple', left: 700, bottom: 10 },
    { type:'apple', left: 40, bottom: 160 },
    { type:'apple', left: 750, bottom: 400 },
    { type:'apple', left: 850, bottom: 500 },
    { type:'apple', left: 40, bottom: 400 }
  ])

  window.game.addPlayer(froggy);
  window.game.addEnemy(mushroom);
  // window.game.addEnemy(mushroom2);

  window.game.init();
}
