var AtmosphereController = function (settings) {

    this.Data = {
        Info: {
            lastDashDraw: 0
        }
    };

    return {
        Data: this.Data,
        draw: this.draw,
        drawDashes: this.drawDashes
    };
};

AtmosphereController.prototype.drawDashes = function (dt) {
    var now = Date.now();
    

    if (this.Data.Info.lastDashDraw + (250 * (1 - Game.getDifficultyModifier())) < now) {        
        Dashes.push(new Dash({
            Data: {
                Position: {
                    X: (Scene.Viewport.Width * 0.75) + Math.random() * (Scene.Viewport.Width * 0.25),
                    Y: Math.random() * Scene.Viewport.Height,
                    Height: Math.random() * (4 * Game.getDifficultyModifier()).max(4).min(1)
                },
                Info: {
                    Colour: "white"
                }
            }
        }));

        this.Data.Info.lastDashDraw = now;
    }

    for (var i = 0; i < Dashes.length; i++) {
        Dashes[i].draw(dt);
    }
}

AtmosphereController.prototype.draw = function (dt) {
    this.drawDashes(dt);
}

var Atmosphere = new AtmosphereController;