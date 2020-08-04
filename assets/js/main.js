// Непонятно почему, но весь этод код работает только при подкюченном phaser.min.js
// При попытке подключить просто phaser.js всё крашится
let mainState = {
    // Счетчик рекордов
    recordScore: 0,

    preload: function () {
        game.load.image('bird', 'assets/images/christmasberd.png');
        game.load.image('pipeTop', 'assets/images/full-pipe-top.png');
        game.load.image('pipeBottom', 'assets/images/full-pipe-bottom.png');
        game.load.image('backGround', 'assets/images/background.png');
        game.load.image('groundPiece', 'assets/images/groundPiece.png');
        game.load.audio('jump', 'assets/sounds/fly.mp3');
        game.load.audio('score', 'assets/sounds/score.mp3');
        game.load.audio('die', 'assets/sounds/die.mp3');
        game.load.audio('hit', 'assets/sounds/hit.mp3');
    },

    create: function () {
        // инициализация звуков и картинок
        game.add.image(0, 0, 'backGround');
        for (let i = 0; i < Constants.FIELD_X/Constants.GROUND_PIECE_LENGTH; i++){
            game.add.image(i * Constants.GROUND_PIECE_LENGTH, Constants.FIELD_Y - Constants.GROUND_PIECE_LENGTH, 'groundPiece');
        }
        this.jumpSound = game.add.audio('jump');
        this.scoreSound = game.add.audio('score');
        this.dieSound = game.add.audio('die');
        this.hitSound = game.add.audio('hit');

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


        // Пустая группа труб, с таймером, котрый их спавнит
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(Constants.PIPE_TIMER, this.addPipePair, this);

        // Счет и рекорд
        this.score = 0;
        this.labelScore = game.add.text(20, 20, 'Score: ' + this.score,
            { font: "30px Arial", fill: "#ffffff" });
        this.recordScoreLabel = game.add.text(440, 20, 'Record: ' + this.recordScore,
            { font: "30px Arial", fill: "#ffff00" });

        this.bird.anchor.setTo(Constants.BIRD_ANCHOR_X, Constants.BIRD_ANCHOR_Y);
    },

    update: function () {
        // Проверка на выход за границы поля
        if (this.bird.y < 0 || this.bird.y > Constants.FIELD_Y){
            this.dieSound.play();
            this.restartGame();
        }

        // Счет, который работает через жопу,
        // так как считает дважды.
        // Либо я тупой и не разобрался в таймерах и их документации,
        // либо они действительно кривые
        if (this.pipes.children[0] !== undefined){
               if (this.pipes.children[this.score].x < Constants.BIRD_POS_X ) {
               this.addScore();
               this.updateRecord();
            }
        }

        // Птица всегда падает мордой вниз
        if (this.bird.angle < Constants.BIRD_ANGLE) this.bird.angle += 1;

        // Возможность вмазаться в трубу
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    },

    addScore: function () {
        this.score++;
        this.labelScore.text = 'Score: ' + this.score;
        this.scoreSound.play();
    },

    updateRecord: function () {
        if (this.score > this.recordScore){
            this.recordScore = this.score;
            this.recordScoreLabel.text = 'Record: ' + this.recordScore;
        }
    },

    jump: function () {
        // Если птица уже дохлая, то ничего не делаем
        if (this.bird.alive === false) return;

        this.bird.body.velocity.y = Constants.BIRD_JUMP_VELOCITY_Y;

        // Добавляем курице анимацию поворота при прыжке
        // на заданный угол и скорость поворота
        let animation = game.add.tween(this.bird);
        animation.to({angle: -Constants.BIRD_ANGLE}, Constants.BIRD_ANGLE_ROTATION_SPEED);
        animation.start();

        this.jumpSound.play();
    },

    restartGame: function () {
        game.state.start('main');
    },

    hitPipe: function (){
        // Если птица уже дохлая, то ничего не делаем
        if (this.bird.alive === false) return;

        // Убиваем птицу
        this.bird.alive = false;
        this.hitSound.play();

        // выключаем таймер спавна труб
        game.time.events.remove(this.timer);

        // Останавливаем трубы
        this.pipes.forEach(function (pipe) {
            pipe.body.velocity.x = 0;
            }, this);
    },

    addOnePipe: function (x, y, top = true) {
        // Создание либо верхней либо нижней трубы
        let pipe;
        if (top) {
            pipe = game.add.sprite(x, y, 'pipeTop');
        } else pipe = game.add.sprite(x, y, 'pipeBottom');

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