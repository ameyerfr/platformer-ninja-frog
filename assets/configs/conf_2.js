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
      botMove : { goLeft:50, goRight:50, offset:100, firstMove:'right' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:750, bottom:0 },
      botMove : { goLeft:400, goRight:400, offset:800, firstMove:'left' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:1700, bottom:0 },
      botMove : { goLeft:200, goRight:200, offset:400, firstMove:'right' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:300, bottom:750 },
      botMove : { goLeft:200, goRight:200, offset:400, firstMove:'left' },
      reverseSpriteDir:true,
      jumpHeight:15
    },
    {
      name:'mushroom',
      hurtbox : { top:24, left:16, width:32, height:38 },
      initialPosition: { left:900, bottom:750 },
      botMove : { goLeft:200, goRight:200, offset:400, firstMove:'right' },
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

    {type:'hardblock-64',  left:530, bottom:280},

    {type:'hardblock-v',  left:1250, bottom:0},
    {type:'hardblock-v',  left:1444, bottom:0},
    {type:'hardblock-v',  left:1444, bottom:94},

    {type:'hardblock-h',  left:1098, bottom:158},
    {type:'hardblock-h',  left:1192, bottom:188},
    {type:'hardblock-h',  left:1286, bottom:188},
    {type:'hardblock-h',  left:1380, bottom:188},
    {type:'hardblock-32',  left:1380, bottom:218},

    {type:'hardblock-32',  left:1608, bottom:188},
    {type:'hardblock-h',  left:1638, bottom:188},

    {type:'hardblock-h',  left:1000, bottom:350},
    {type:'hardblock-32',  left:1064, bottom:380},
    {type:'hardblock-32',  left:1188, bottom:380},
    {type:'hardblock-h',  left:1188, bottom:350},
    {type:'hardblock-h',  left:1282, bottom:350},
    {type:'hardblock-h',  left:1374, bottom:350},
    {type:'hardblock-v',  left:1438, bottom:380},
    {type:'hardblock-64',  left:1468, bottom:412},

    {type:'hardblock-32',  left:1408, bottom:474},
    {type:'hardblock-32',  left:1378, bottom:504},
    {type:'hardblock-32',  left:1348, bottom:534},
    {type:'hardblock-32',  left:1318, bottom:564},
    {type:'hardblock-32',  left:1288, bottom:594},
    {type:'hardblock-32',  left:1258, bottom:624},
    {type:'hardblock-32',  left:1228, bottom:654},
    {type:'hardblock-32',  left:1198, bottom:684},

    {type:'hardblock-h',  left:1104, bottom:684},
    {type:'hardblock-h',  left:1010, bottom:684},
    {type:'hardblock-h',  left:916, bottom:684},
    {type:'hardblock-h',  left:822, bottom:684},
    {type:'hardblock-h',  left:728, bottom:684},
    {type:'hardblock-h',  left:634, bottom:684},
    {type:'hardblock-h',  left:540, bottom:684},
    {type:'hardblock-h',  left:446, bottom:684},
    {type:'hardblock-h',  left:352, bottom:684},
    {type:'hardblock-h',  left:258, bottom:684},
    {type:'hardblock-h',  left:164, bottom:684},
    {type:'hardblock-h',  left:70, bottom:684},

    {id:90, type:'platform',     h:10, w:96, left:850, bottom:170, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-200px)'}], duration:5000} },
    {id:91, type:'platform',     h:10, w:96, left:850, bottom:330, animate:{keys:[{transform:'translateX(-200px)'},{transform:'translateX(50px)'}], duration:5000} },
    {id:92, type:'platform',     h:10, w:96, left:1700, bottom:350, animate:{keys:[{transform:'translateX(-100px)'},{transform:'translateX(100px)'}], duration:5000} },
    {id:92, type:'platform',     h:10, w:96, left:850, bottom:490, animate:{keys:[{transform:'translateX(50px)'},{transform:'translateX(-200px)'}], duration:5000} }
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

    { type:'shuriken', left: 300, bottom: 30 },
    { type:'shuriken', left: 500, bottom: 30 },
    { type:'shuriken', left: 700, bottom: 30 },
    { type:'shuriken', left: 900, bottom: 30 },
    { type:'shuriken', left: 1100, bottom: 30 },
    { type:'shuriken', left: 1350, bottom: 30 },
    { type:'shuriken', left: 1670, bottom: 30 },

    { type:'shuriken', left: 650, bottom: 230 },
    { type:'shuriken', left: 950, bottom: 230 },

    { type:'shuriken', left: 500, bottom: 600 },
    { type:'shuriken', left: 700, bottom: 600 },
    { type:'shuriken', left: 900, bottom: 600 },

    { type:'shuriken', left: 300, bottom: 1000 },
    { type:'shuriken', left: 600, bottom: 1000 },
    { type:'shuriken', left: 900, bottom: 1000 },

    { type:'shuriken', left: 1350, bottom: 400 },
    { type:'shuriken', left: 1800, bottom: 400 }


  ]
}
