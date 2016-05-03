/**
 * This block of code is a requestAnimationFrame fallback, for older browsers
 * If i recall correctly i got it from stackoverflow years ago...
 * Its probably not even needed as this is probably now supported in most browsers
 */
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


var lastTime = 0;

var FPS = [];


/**
 * This is the program loop, but it isnt named that as i want to split the loop up
 * into the various parts
 * Ultimately this is the main entrance point of the application and wll hold the main code
 * @returns {bool}
 */
function main() {
    var now = Date.now();
    var dt = now - lastTime; //Time since last loop

    /**
     * If the time between since last loop is so great, then the jump it could cause
     * may actually break everything, so we skip that loop until the users computer
     * can handle the stress of... whatever they are dealing with
     */
    if (dt < 1000) {
        Scene.sync();

        Scene.cachedID = now;
        Container.renderAll(dt);
        showFPS(dt);

        if (!Game.Data.inMenu) {
            Entity.checkCollisions(dt);
            mainLoop(dt);
            Atmosphere.draw(dt);
            Entity.renderAll(dt);
        }
    }

    lastTime = now;

    /**
     * rerun the function when the computer can render the animation frame
     */
    requestAnimFrame(main);
}

/**
 * This function will display the users current FPS in the top left corner if
 * the key D is currently being pressed.
 *
 * This is for debugging performance.
 *
 * @param {Number} dt
 * @returns {undefined}
 */
function showFPS(dt) {
    /**
     * First we need to record the current FPS  in order to average out
     * all the recent records
     *
     * The reason why it needs to be averaged is that it fluctuates too much to
     * even be read.
     *
     * This code will attempt to average it to whatever the last second was.
     * So the more frames the user has, the more frames it will reference when
     * averaging.
     */
    FPS.push(Math.round(1000 / dt));

    var total = 0;

    FPS.forEach(function (e) {
        total += e;
    });

    if (FPS.length > Math.round(1000 / dt)) { //the seconds average... about
        FPS.shift();
    }

    /**
     * Now we dont want to show this information all the time,
     * so we only show it when the user pressed the D key.
     */
    if (Key.isKeyPressed(KeyCode.F, false)) {
        Scene.context.globalAlpha = 1;
        Scene.context.font = "16px Georgia";
        Scene.context.textAlign = 'left';
        Scene.context.fillStyle = "white";
        Scene.context.fillText("FPS: " + Math.round(total / FPS.length), 25, 25);
    }
}

/**
 * So if you are reading the code, up until this point, nothing has happened.
 * Its just us declaring functions, variables etc
 *
 * This bit of code here is responsible for "Starting" everything, and it runs when the document has finished loading
 *
 * This block of code is also what runs main() for the first time
 */
document.addEventListener('DOMContentLoaded', function () {
    Scene.updateViewport();
    window.addEventListener('resize', function (e) {
        Scene.onResize();
    }, true);

    window.addEventListener("keydown", function (e) {
        Key.onKeyPressed(e);
        //e.preventDefault(); //stops the browser from doing what it was meant to do
    });

    window.addEventListener("keyup", function (e) {
        Key.onKeyUp(e);
    });

    Scene.canvas.addEventListener("mousedown", function (e) {
        Mouse.press(e);
    });

    Scene.canvas.addEventListener("mouseup", function (e) {
        Mouse.release(e);
    });

    Scene.canvas.addEventListener("mousemove", function (e) {
        Mouse.move(e);
    });

    /**
     * Load all the additional containers for the page.
     *
     * @param {type} obj
     * @returns {undefined}
     */
    loadJSON("Data/Containers.json", function (obj) {
        obj.forEach(function (e) {
            if (e.Type === "TextBox") {
                Container.add(new ContainerElement_TextBox(e.Data.Description, e));
            } else if (e.Type === "PictureBox") {
                Container.add(new ContainerElement_PictureBox(e.Data.Description, e));
            } else {
                Container.add(new ContainerElement(e.Data.Description, e));
            }
        });

        Container.find('textGameDesc').Data.Text.Value = "Can you escape earth and safely navigate the asteroids?";
    });

    loadJSON("Data/Models.json", function (obj) {
        obj.forEach(function (e) {
            Model.add(new ModelElement(e.Data.Description, e));
        });
    });

    loadJSON("Data/Entities.json", function (obj) {
        obj.forEach(function (e) {
            Entity.add(new EntityElement(e.Data.Description, e));
        });
    });

    loadJSON("Data/Highscores.json", function (obj) {
        if (window.localStorage) {
            if (!window.localStorage.getItem('aeHighscores')) {
                window.localStorage.setItem('aeHighscores', JSON.stringify(obj));
            }
        } else {
            loadHighscores(obj);
        }
    });

    /**
     * and now... after all that, we actually start everything
     */
    setTimeout(main, 150);
});

/**
 * This is a native way to just do an AJAX request for a JSON file. It may need
 * to be extended upon for further browser support.
 *
 * @param {String} URL
 * @param {Function} Func
 * @returns {undefined}
 */
function loadJSON(URL, Func) {
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var obj = JSON.parse(request.responseText);

            Func(obj);
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
}