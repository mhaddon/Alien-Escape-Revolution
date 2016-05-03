/**
 * This class is responsible for handling and controlling the pages canvas scene
 *
 */
var GameController = function (settings) {
    this.Data = {
        inMenu: true,
        GameStart: 0,
        Score: 0,
        ScoreModifier: 0,
        Age: 0
    }

    this.getScore = function () {
        return Math.round((this.Data.Age / 25) + this.Data.ScoreModifier);
    }

    this.addScoreModifier = function (Amount) {
        this.Data.ScoreModifier += parseInt(Amount, 10);
    }

    this.addAge = function (dt) {
        this.Data.Age += dt;
    }

    this.resetScore = function () {
        this.Data.Score = 0;
        this.Data.Age = 0;
        this.Data.ScoreModifier = 0;
    }

    this.getDifficultyModifier = function () {
        return (Math.sqrt(this.Data.Age / 2) * 1.5 / 350).min(0.01).max(0.99);
    }

    this.reset = function () {
        Game.resetScore();

        Entity.find('Player').import({
            Data: {
                Position: {
                    X: 600,
                    Y: 200
                },
                Physics: {
                    Velocity: {
                        X: 0,
                        Y: 0
                    }
                }
            }
        });
        
        Entity.killNonProtected();

        Dashes = new Array();

    }

    return {
        Data: this.Data,
        getScore: this.getScore,
        addScoreModifier: this.addScoreModifier,
        addAge: this.addAge,
        getDifficultyModifier: this.getDifficultyModifier,
        resetScore: this.resetScore,
        reset: this.reset
    };
};

var Game = new GameController();