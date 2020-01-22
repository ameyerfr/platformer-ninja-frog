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
    reverseSpriteDir:true,
    jumpHeight:15
  });

  window.game.addPlayer(froggy);

  window.game.generateObstacles([
    {id:1, type:'hardblock-32', h:32, w:32, left:120, bottom:80},
    {id:2, type:'hardblock-64', h:64, w:64, right:150, top:150},
    {id:3, type:'hardblock-32', h:32, w:32, left:200, bottom:200},
    {id:4, type:'hardblock-32', h:32, w:32, left:850, bottom:330},
    {id:5, type:'platform',     h:10, w:96, left:300, bottom:350, animate:{keys:[{transform:'translateX(-50px)'},{transform:'translateX(50px)'}], duration:2000} },
    {id:6, type:'platform',     h:10, w:96, left:550, bottom:350, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:2000} },
    {id:7, type:'platform',     h:10, w:96, left:550, bottom:30, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:2000} }

  ])



  setTimeout(function(){
    window.game.addEnemy(mushroom);
  }, 2000)

  window.game.init();
}
