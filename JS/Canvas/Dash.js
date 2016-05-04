var DashController = function () {
    this.Elements = new Array();

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

DashController.prototype.add = function (DashElement) {
    this.Elements.push(DashElement);
}

DashController.prototype.removeElement = function (DashElement) {
    for (var i = 0; i < this.Elements.length; i++) {
        var e = this.Elements[i];
        if (DashElement === e) {
            this.Elements.splice(i, 1);
            return true;
        }
    }
    return false;
}

DashController.prototype.killAll = function () {
    this.Elements = new Array();
}

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