class Constants {
    // Класс с константами, чтобы избежать магических цифр
    // Статический, чтобы не создавать объект

    static _FIELD_X = 600;
    static _FIELD_Y = 800;
    static _BIRD_POS_X = 100;
    static _BIRD_POS_Y = 345;
    static _BIRD_GRAVITY_Y = 1000;
    static _BIRD_JUMP_VELOCITY_Y = -350;
    static _PIPE_VELOCITY_X = -200;
    static _PIPE_GAP = 200;
    static _PIPE_TOP_MIN = 40; // -760
    static _PIPE_TOP_MAX = 550; // -500
    static _PIPE_LENGTH = 800;
    static _PIPE_SPAWN_X = 600;
    static _PIPE_TIMER = 2000;
    static _GROUND_PIECE_LENGTH = 30;
    static _BIRD_ANCHOR_X = -0.2;
    static _BIRD_ANCHOR_Y = 0.5;
    static _BIRD_ANGLE = 20;
    static _BIRD_ANGLE_ROTATION_SPEED = 100;


    static get PIPE_VELOCITY_X() {
        return this._PIPE_VELOCITY_X;
    }

    static get FIELD_X() {
        return this._FIELD_X;
    }

    static get FIELD_Y() {
        return this._FIELD_Y;
    }

    static get BIRD_GRAVITY_Y() {
        return this._BIRD_GRAVITY_Y;
    }

    static get BIRD_JUMP_VELOCITY_Y() {
        return this._BIRD_JUMP_VELOCITY_Y;
    }

    static get BIRD_POS_X() {
        return this._BIRD_POS_X;
    }

    static get BIRD_POS_Y() {
        return this._BIRD_POS_Y;
    }

    static get PIPE_GAP() {
        return this._PIPE_GAP;
    }

    static get PIPE_TOP_MIN() {
        return this._PIPE_TOP_MIN;
    }

    static get PIPE_TOP_MAX() {
        return this._PIPE_TOP_MAX;
    }

    static get PIPE_LENGTH() {
        return this._PIPE_LENGTH;
    }

    static get PIPE_SPAWN_X() {
        return this._PIPE_SPAWN_X;
    }

    static get PIPE_TIMER() {
        return this._PIPE_TIMER;
    }

    static get GROUND_PIECE_LENGTH() {
        return this._GROUND_PIECE_LENGTH;
    }

    static get BIRD_ANCHOR_X() {
        return this._BIRD_ANCHOR_X;
    }

    static get BIRD_ANCHOR_Y() {
        return this._BIRD_ANCHOR_Y;
    }

    static get BIRD_ANGLE() {
        return this._BIRD_ANGLE;
    }

    static get BIRD_ANGLE_ROTATION_SPEED() {
        return this._BIRD_ANGLE_ROTATION_SPEED;
    }
}