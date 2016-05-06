/**
 * This function is the part of the code where i deal with the player in particular
 * 
 * @param {Number} dt
 * @returns {undefined}
 */
function mainLoop(dt) {
    Game.addAge(dt);

    /**
     * The generic, press right, you go right stuff
     */
    if (Key.isKeyPressed(KeyCode.RIGHT_ARROW, false) || Key.isKeyPressed(KeyCode.D, false)) {
        var Player = Entity.find('Player');
        Player.Data.Physics.Velocity.X += Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.LEFT_ARROW, false) || Key.isKeyPressed(KeyCode.A, false)) {
        var Player = Entity.find('Player');
        Player.Data.Physics.Velocity.X -= Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.DOWN_ARROW, false) || Key.isKeyPressed(KeyCode.S, false)) {
        var Player = Entity.find('Player');
        Player.Data.Physics.Velocity.Y += Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.UP_ARROW, false) || Key.isKeyPressed(KeyCode.W, false)) {
        var Player = Entity.find('Player');
        Player.Data.Physics.Velocity.Y -= Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.F, false)) {
        Scene.drawText(25, 25, "FPS: " + Scene.getFPS(),
                ({
                    Opacity: 1,
                    Align: "left",
                    Colour: "white",
                    Font: "16px Georgia"
                }));
    }


    /**
     * This code gives the effect of us flying through space, by sliding the white gradient away
     */
    Scene.canvas.style.backgroundPositionX = (-(Math.round(Game.getScore() / 2))) + 'px';
    Scene.canvas.style.backgroundRepeat = 'no-repeat'; //this has to be redefined constantly because everyone loves css

    Container.find('textScore').Data.Text.Value = Math.floor(Game.getScore());
}