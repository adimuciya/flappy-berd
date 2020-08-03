let mainState = {
    preload: function () {
        game.load.image('bird', 'assets/images/fatBird.png');
        game.load.image('pipeTop', 'assets/images/full-pipe-top.png');
        game.load.image('pipeBottom', 'assets/images/full-pipe-bottom.png');
    },

    create: function () {
        // инициализация всего
        game.stage.backgroundColor = Constants.STAGE_BACKGROUND;

        // Задаем физику
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Рисуем птицу на позиции
        this.bird = game.add.sprite(Constants.BIRD_POS_X, Constants.BIRD_POS_Y, 'bird');

        // Добавляем физику к птице
        game.physics.arcade.enable(this.bird);

        // Добавляем гравитацию к птице
        this.bird.body.gravity.y = Constants.BIRD_GRAVITY_Y;

        // Инициализируем пробел, как пробел
        let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Эвентлистенер на пробел
        spaceKey.onDown.add(this.jump, this);


        // Пустая группа труб
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(Constants.PIPE_TIMER, this.addPipePair, this);

        // Счет
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ffffff" });
    },

    update: function () {

        if (this.bird.y < 0 || this.bird.y > Constants.FIELD_Y){
            this.restartGame();
        }
        if (this.pipes.children[0] !== undefined){
            console.log(this.pipes.children.length)
            console.log(this.pipes.children[0].x);
        }

        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },

    jump: function () {
        this.bird.body.velocity.y = Constants.BIRD_JUMP_VELOCITY_Y;

    },

    restartGame: function () {
        game.state.start('main');
    },

    addOnePipe: function (x, y, top = true) {
        let pipe;
        if (top) {
            pipe = game.add.sprite(x, y, 'pipeTop')
        } else pipe = game.add.sprite(x, y, 'pipeBottom')


        this.pipes.add(pipe);

        game.physics.arcade.enable(pipe);

        pipe.body.velocity.x = Constants.PIPE_VELOCITY_X;

        // Уничтожение труб, когда они не видны
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addPipePair: function () {


        let topPipeY = Math.floor((Math.random() * (Constants.PIPE_TOP_MAX - Constants.PIPE_TOP_MIN) + Constants.PIPE_TOP_MIN));
        let bottomPipeY = Constants.PIPE_GAP + topPipeY;
        this.addOnePipe(Constants.PIPE_SPAWN_X, topPipeY - Constants.PIPE_LENGTH);
        this.addOnePipe(Constants.PIPE_SPAWN_X, bottomPipeY, false);
    }

};
let game = new Phaser.Game(Constants.FIELD_X, Constants.FIELD_Y);

game.state.add('main', mainState);

game.state.start('main');