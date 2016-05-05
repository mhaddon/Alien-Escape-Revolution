var DashController = function () {
    this.constructor();

    this.Data = {
        lastRender: 0
    };

    return {
        Elements: this.Elements,
        add: this.add,
        removeElement: this.removeElement,
        killAll: this.killAll,
        renderAll: this.renderAll,
        Data: this.Data
    }
}

DashController.prototype = Object.create(Controller.prototype);
DashController.prototype.constructor = Controller;

DashController.prototype.renderAll = function (dt) {
    var now = Date.now();


    if (this.Data.lastRender + (250 * (1 - Game.getDifficultyModifier())) < now) {
        Dash.add(new DashElement({
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

        this.Data.lastRender = now;
    }

    this.Elements.forEach(function (e) {
        e.draw(dt);
    });
}

var Dash = new DashController;