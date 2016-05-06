var DashElement = function (settings) {
    this.Data = {
        Position: {
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0,
            nw: 0
        },
        Info: {
            Opacity: 1,
            Colour: "black"
        }
    };

    this.loadObject(settings);

    return {
        Data: this.Data,
        draw: this.draw,
        import: this.import,
        loadObject: this.loadObject,
        kill: this.kill
    }
};

/**
 * This function is responsible for importing an object of data into this class
 * It uses a deepmerge in order to achieve this.
 *
 *
 * @param {Object} settings
 * @returns {undefined}
 */
DashElement.prototype.import = function (settings) {
    /**
     * I need to recode this function, i just cant think at the moment
     */
    for (var greaterPropertyName in settings) {
        /**
         * We dont want to overide variables that should be protected
         */
        if (greaterPropertyName === 'Data') {
            mergeDeep(this[greaterPropertyName], settings[greaterPropertyName]);
        }
    }
}

/**
 * This class will load a current object into the system, it will also ensure that
 * the Description contains the correct name. This is so we can find this object
 * in future.
 *
 * @param {String} name
 * @param {Object} settings
 * @returns {undefined}
 */
DashElement.prototype.loadObject = function (settings) {
    this.import(settings);
}

DashElement.prototype.draw = function (dt) {
    var moveSpeed = (dt * 0.65) * (1 - Game.getDifficultyModifier());

    this.Data.Position.nw += moveSpeed;
    this.Data.Position.nw = this.Data.Position.nw.max(500);
    this.Data.Position.X -= moveSpeed;

    var Opacity = (1 - (this.Data.Position.nw / 500)) * 0.55;


    Scene.drawLine(this.Data.Position.X - this.Data.Position.nw, this.Data.Position.Y, this.Data.Position.X, this.Data.Position.Y,
            ({
                Opacity: Opacity,
                Colour: this.Data.Info.Colour,
                Width: this.Data.Position.Height
            }));

    if (Opacity <= 0) {
        this.kill(dt);
    }


}

DashElement.prototype.kill = function (dt) {
    Dash.removeElement(this);
}