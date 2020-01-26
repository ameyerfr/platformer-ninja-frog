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
      initialPosition: { left:250, bottom:126 },
      botMove : { goLeft:50, goRight:50, offset:100, firstMove:'left' },
      reverseSpriteDir:true,
      jumpHeight:15
    }
  ],

  obstacles : [
    {type:'hardblock-v',  left:250, bottom:0},

    {type:'hardblock-h',  left:156, bottom:94},
    {type:'hardblock-32',  left:250, bottom:94},
    {type:'hardblock-h',  left:280, bottom:94},
    {type:'hardblock-32',  left:376, bottom:124},
    {type:'hardblock-32',  left:376, bottom:154},
    {type:'hardblock-h',   left:406, bottom:154},

    {type:'hardblock-v',  left:156, bottom:124},
    {type:'hardblock-v',  left:156, bottom:218},
    {type:'hardblock-v',  left:156, bottom:312},

    {type:'hardblock-v',  left:500, bottom:154},
    {type:'hardblock-h',   left:406, bottom:280},
    {type:'hardblock-v',   left:500, bottom:248},


    {type:'hardblock-32',  left:126, bottom:94},
    {type:'hardblock-32',  left:0, bottom:218},
    {type:'hardblock-32',  left:30, bottom:218},
    {type:'hardblock-32',  left:126, bottom:312},

    {type:'hardblock-32',  left:186, bottom:218},


    {type:'hardblock-h',  left:156, bottom:406},
    {type:'hardblock-h',  left:436, bottom:406},
    {type:'hardblock-h',  left:342, bottom:406},

    // {type:'hardblock-64',  left:0, bottom:408},


    // {type:'hardblock-h',  left:96, bottom:152},
    // {type:'hardblock-h',  left:192, bottom:184},
    // {type:'hardblock-h',  left:286, bottom:184},
    // {type:'hardblock-h',  left:380, bottom:184},
    // {type:'hardblock-32',  left:380, bottom:214},
    //
    // {type:'hardblock-32',  left:608, bottom:184},
    // {type:'hardblock-h',  left:638, bottom:184},
    //
    // {type:'hardblock-h',  left:0, bottom:350},
    // {type:'hardblock-32',  left:64, bottom:380},
    // {type:'hardblock-32',  left:188, bottom:380},
    // {type:'hardblock-h',  left:188, bottom:350},
    // {type:'hardblock-h',  left:282, bottom:350},
    // {type:'hardblock-h',  left:374, bottom:350},
    // {type:'hardblock-v',  left:438, bottom:380},
    // {type:'hardblock-64',  left:468, bottom:412},
    //
    // {type:'hardblock-64',  bottom:0, right:0},

    {id:99, type:'platform',     h:10, w:96, left:650, bottom:350, animate:{keys:[{transform:'translateX(-50px)'},{transform:'translateX(50px)'}], duration:2000} },
    {id:99, type:'platform',     h:10, w:96, left:750, bottom:450, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:3000} },
    {id:99, type:'platform',     h:10, w:96, left:550, bottom:480, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-50px)'}], duration:4000} }
  ],

  items : [
    { type:'shuriken', left: 200, bottom: 30 },
    { type:'shuriken', left: 30, bottom: 150 },
    { type:'shuriken', left: 30, bottom: 420 },
    { type:'shuriken', left: 30, bottom: 500 },

    { type:'shuriken', left: 200, bottom: 140 },

    { type:'shuriken', left: 200, bottom: 270 },
    { type:'shuriken', left: 280, bottom: 270 },
    { type:'shuriken', left: 360, bottom: 270 },
    { type:'shuriken', left: 240, bottom: 330 },
    { type:'shuriken', left: 320, bottom: 330 },

    { type:'shuriken', left: 450, bottom: 210 },

    { type:'shuriken', left: 300, bottom: 30 }
  ]
}
