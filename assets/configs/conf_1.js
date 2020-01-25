var gameConfig = {
  player : {
    name:'froggy',
    hurtbox : { top:12, left:16, width:30, height:50 },
    zIndex:10
  },

  ennemies : [
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:520, bottom:0 },
      botMove : { goLeft:150, goRight:150, offset:300, firstMove:'right' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:250, bottom:250 },
      botMove : { goLeft:70, goRight:70, offset:140, firstMove:'left' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:300, bottom:400 },
      botMove : { goLeft:70, goRight:70, offset:140, firstMove:'right' },
      reverseSpriteDir:true,
      jumpHeight:15
    }
  ],

  obstacles : [
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
  ],

  items : [
    { type:'shuriken', left: 150, bottom: 10 },
    { type:'shuriken', left: 350, bottom: 10 },
    { type:'shuriken', left: 800, bottom: 10 },
    { type:'shuriken', left: 40, bottom: 160 },
    { type:'shuriken', left: 750, bottom: 380 },
    { type:'shuriken', left: 850, bottom: 500 },
    { type:'shuriken', left: 20, bottom: 400 }
  ]
}
