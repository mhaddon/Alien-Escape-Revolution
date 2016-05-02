Containers.push(new Container('containerMenu', {
    Data: {
        Position: {
            X: 0,
            Y: 0,
            Width: "100%",
            Height: "100%"
        }
    }
}));

Containers.push(new Container('containerTitle', {
    Data: {
        Position: {
            X: 0,
            Y: 0,
            Width: "100%",
            Height: "100%"
        }
    }
}));

Containers.push(new TextBox('textGameTitle', {
    Data: {
        Position: {
            X: 0,
            Y: 65,
            Width: 400,
            Height: 15,
            CenterOffset: "X",
            Centered: "X",
            Parent: "containerTitle"
        },
        Text: {
            On: true,
            Value: 'Alien Escape',
            Size: 102,
            Colour: 'white'
        }
    }
}));

Containers.push(new TextBox('textGameTitleDesc', {
    Data: {
        Position: {
            X: 0,
            Y: 120,
            Width: 500,
            Height: 15,
            CenterOffset: "X",
            Centered: "X",
            Parent: "containerTitle"
        },
        Text: {
            On: true,
            Value: 'Remastered',
            Size: 20,
            Colour: 'white',
            Outline: true,
            Align: "left",
            Center: false,
            LetterSpacing: true,
            Padding: 0
        }
    }
}));

Containers.push(new TextBox('textGameDesc', {
    Data: {
        Position: {
            X: 0,
            Y: "100%-60px",
            Width: 400,
            Height: 15,
            CenterOffset: "X",
            Centered: "X",
            Parent: "containerMenu"
        },
        Text: {
            On: true,
            Value: 'Downloading Game Data...',
            Size: 24,
            Colour: 'white'
        }
    }
}));