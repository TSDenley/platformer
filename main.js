var mainState = {
  preload: function() {
    game.load.image('player', 'assets/player.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('lava', 'assets/lava.png');
  },

  create: function() {
    game.stage.backgroundColor = '#3598db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    // Player
    this.player = game.add.sprite(20, 100, 'player');
    this.player.body.gravity.y = 600;
    this.player.body.collideWorldBounds = true;

    // Controls
    this.cursor = game.input.keyboard.createCursorKeys();

    // Level
    this.walls = game.add.group();
    this.coins = game.add.group();
    this.lava = game.add.group();

    var level = [
      '',
      '',
      '',
      '',
      '',
      '',
      '            o o o',
      '         xxxxxxxxxxx',
      '',
      '',
      '',
      'xxxxx',
      '',
      '                       o  o',
      '                     xxxxxxx',
      '',
      '',
      ' o  o        o',
      'xxxxxxxx!!!!xxx!!!!!!!!!!!!!!!',
      'xxxxxxxx!!!!xxx!!!!!!!!!!!!!!!'
    ];

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        switch (level[i][j]) {
          case 'x':
            var wall = game.add.sprite(0+20*j, 0+20*i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true;
            break;

          case 'o':
            var coin = game.add.sprite(0+20*j, -15+20*i, 'coin');
            this.coins.add(coin);
            break;

          case '!':
            var lava = game.add.sprite(0+20*j, 0+20*i, 'lava');
            this.lava.add(lava);
        }
      }
    }
  },

  update: function() {
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null);
    game.physics.arcade.overlap(this.player, this.lava, this.restart, null, this);

    // Controls
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    // Jump
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
    }
  },

  takeCoin: function(player, coin) {
    coin.kill();
  },

  restart: function() {
    game.state.start('main');
  }
};

var game = new Phaser.Game(600, 400);
game.state.add('main', mainState);
game.state.start('main');
