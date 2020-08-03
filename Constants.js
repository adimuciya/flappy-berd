class Constants {


    static _FIELD_X = 400;
    static _FIELD_Y = 500;
    static _STAGE_BACKGROUND = '#71c5cf';
    static _BIRD_POS_X = 100;
    static _BIRD_POS_Y = 245;
    static _BIRD_GRAVITY_Y = 1000;
    static _BIRD_JUMP_VELOCITY_Y = -350;
    static _PIPE_VELOCITY_X = -200;
    static _PIPE_GAP = 150;
    static _PIPE_TOP_MIN = 40; // -760
    static _PIPE_TOP_MAX = 300; // -500
    static _PIPE_LENGTH = 800;
    static _PIPE_SPAWN_X = 400;
    static _PIPE_TIMER = 1500;


    static get PIPE_VELOCITY_X() {
        return this._PIPE_VELOCITY_X;
    }

    static get FIELD_X() {
        return this._FIELD_X;
    }

    static get FIELD_Y() {
        return this._FIELD_Y;
    }

    static get STAGE_BACKGROUND() {
        return this._STAGE_BACKGROUND;
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
}