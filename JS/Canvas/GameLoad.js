function gameLoad() {
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

    loadJSON("Data/Audio.json", function (obj) {
        obj.forEach(function (e) {
            gAudio.add(new AudioElement(e.Data.Description, e));
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
}