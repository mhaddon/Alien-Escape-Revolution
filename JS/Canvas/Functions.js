/**
 * This function simply opens a URL in a new tab,
 * There may need to be a fallback if the browser tries to open this in a new
 * window, as AV programs and browsers will see this potentially as a popup?
 * 
 * @param {String} URL
 * @returns {undefined}
 */
function OpenURL(URL) {
    window.open(URL, '_blank');
}

/**
 * This function plays the game, because the game is ALWAYS loaded from a fresh state,
 * (The browser refreshes before each replay... cheating i know)
 * I dont need to do a lot of setting up or dismanteling of old props
 */
function playGame(e) {
    Game.Data.inMenu = false; //take off our stabalisers

    Game.reset();
    Game.Data.GameStart = Date.now(); //this is needed so we know the users score

    /**
     * Hide the various button stuff for the homepage.
     * 
     */
    findContainer('containerMenu').Data.Status.Visible = false;
    findContainer('containerHighscores').Data.Status.Visible = false;
    findContainer('containerTitle').Data.Status.Visible = false;
    findContainer('containerGame').Data.Status.Visible = true;
    findContainer('containerGameOver').Data.Status.Visible = false;
}

/**
 * This function plays the game, because the game is ALWAYS loaded from a fresh state,
 * (The browser refreshes before each replay... cheating i know)
 * I dont need to do a lot of setting up or dismanteling of old props
 */
function showHighscores(e) {
    Game.Data.inMenu = true; //take off our stabalisers

    if (window.localStorage) {
        loadHighscores(JSON.parse(window.localStorage.getItem('aeHighscores')));
    }

    /**
     * Hide the various button stuff for the homepage.
     * 
     */
    findContainer('containerMenu').Data.Status.Visible = false;
    findContainer('containerTitle').Data.Status.Visible = true;
    findContainer('containerHighscores').Data.Status.Visible = true;
    findContainer('containerGame').Data.Status.Visible = false;
    findContainer('containerGameOver').Data.Status.Visible = false;
}

function loadHighscores(obj) {

    var textHighscoresList = findContainer('textHighscoresList');

    obj.sort(compareScore);

    var HighscoresList = [];

    Scene.context.font = textHighscoresList.Data.Text.Size + "px " + textHighscoresList.Data.Text.Font;

    for (var i = 0; i < obj.length; i++) {
        var e = obj[i];
        
        var TextParts = [
            (i + 1) + ". ",
            e.Name,
            "",
            " (" + e.Score + ")"
        ]
        
        var width = Scene.context.measureText(TextParts.join('')).width;
        var maxWidth = textHighscoresList.Data.Position.Width;
        
        var spaceAM = Math.floor((maxWidth - width) / Scene.context.measureText(' ').width);
        

        for (var n = 0; n < spaceAM; n++) {
            TextParts[2] += " ";
        }

        HighscoresList.push(TextParts.join(''));
    }

    textHighscoresList.Data.Text.Value = HighscoresList.join('\r\n');
}

/**
 * This function plays the game, because the game is ALWAYS loaded from a fresh state,
 * (The browser refreshes before each replay... cheating i know)
 * I dont need to do a lot of setting up or dismanteling of old props
 */
function openMainMenu(e) {
    Game.Data.inMenu = true; //take off our stabalisers

    /**
     * Hide the various button stuff for the homepage.
     * 
     */
    findContainer('containerMenu').Data.Status.Visible = true;
    findContainer('containerTitle').Data.Status.Visible = true;
    findContainer('containerHighscores').Data.Status.Visible = false;
    findContainer('containerGame').Data.Status.Visible = false;
    findContainer('containerGameOver').Data.Status.Visible = false;
}



function showGameOver(e) {
    Game.Data.inMenu = true; //take off our stabalisers


    findContainer('textGOScore').Data.Text.Value = "Score: " + Game.getScore();

    /**
     * Hide the various button stuff for the homepage.
     * 
     */
    findContainer('containerTitle').Data.Status.Visible = true;
    findContainer('containerGameOver').Data.Status.Visible = true;
    findContainer('containerHighscores').Data.Status.Visible = false;
    findContainer('containerGame').Data.Status.Visible = false;
    findContainer('containerMenu').Data.Status.Visible = false;
}

function saveScore(e) {
    if (window.localStorage) {
        var Highscores = JSON.parse(window.localStorage.getItem('aeHighscores'));

        var Name = findContainer('textGOEnterName').Data.TextBox.Value;

        if (Name.length === 0) {
            Name = "Guest";
        }

        Highscores.push({
            Name: Name,
            Score: Game.getScore()
        });

        Highscores.sort(compareScore);

        if (Highscores.length >= 10) {
            Highscores.splice(10, Highscores.length - 9);
        }

        window.localStorage.setItem('aeHighscores', JSON.stringify(Highscores));
    }
}


/**
 * This function compares two highscore elements and sorts them descendingly
 * @param {Highscore Class} a
 * @param {Highscore Class} b
 * @returns {Number}
 */
function compareScore(a, b) {
    if (a.Score > b.Score)
        return -1;
    if (a.Score < b.Score)
        return 1;
    return 0;
}