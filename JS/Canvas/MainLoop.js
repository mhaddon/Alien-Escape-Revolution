/**
 * This function is the part of the code where i deal with the player in particular
 * 
 * @param {Number} dt
 * @returns {undefined}
 */
function mainLoop(dt) {
    var now = Date.now();
    
    Game.addAge(dt);
    
    /**
     * The generic, press right, you go right stuff
     */
    if (Key.isKeyPressed(KeyCode.RIGHT_ARROW, false) || Key.isKeyPressed(KeyCode.D, false)) {
        var Player = findEntity('Player');
        Player.Data.Physics.Velocity.X += Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.LEFT_ARROW, false) || Key.isKeyPressed(KeyCode.A, false)) {
        var Player = findEntity('Player');
        Player.Data.Physics.Velocity.X -= Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.DOWN_ARROW, false) || Key.isKeyPressed(KeyCode.S, false)) {
        var Player = findEntity('Player');
        Player.Data.Physics.Velocity.Y += Player.Data.Physics.Thrust * dt;
    }
    if (Key.isKeyPressed(KeyCode.UP_ARROW, false) || Key.isKeyPressed(KeyCode.W, false)) {
        var Player = findEntity('Player');
        Player.Data.Physics.Velocity.Y -= Player.Data.Physics.Thrust * dt;
    }

    /**
     * This bit of code is the part of code that adds a constant pressure to the player to return to the left hand side of the screen
     * ideally it should be smoother, but id probably have to recode a lot of things
     */
    //Entities[0].Physics.Velocity.X -= (0.0018 * (Entities[0].X / scene.Viewport.Width)) * dt;
    
    
    /**
     * This code gives the effect of us flying through space, by sliding the white gradient away
     */
    Scene.canvas.style.backgroundPositionX = (-(Math.round(Game.getScore() / 2))) + 'px';
    Scene.canvas.style.backgroundRepeat = 'no-repeat'; //this has to be redefined constantly because everyone loves css
    
    findContainer('textScore').Data.Text.Value = Math.floor(Game.getScore());
}