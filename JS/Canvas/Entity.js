var EntityController = function () {
    this.Elements = new Array();

    this.Data = {
        lastCollissionCheck: 0,
        collisionCheckDelay: 0
    };


    return {
        Elements: this.Elements,
        Data: this.Data,
        find: this.find,
        add: this.add,
        removeElement: this.removeElement,
        killNonProtected: this.killNonProtected,
        checkCollisions: this.checkCollisions,
        renderAll: this.renderAll
    }
}

EntityController.prototype.killNonProtected = function () {
    for (var i = 0; i < this.Elements.length; i++) {
        var e = this.Elements[i];
        if ((e.Data.AI.Protected === false) && (e.kill())) {
            i--;
        }
    }
}

EntityController.prototype.add = function (EntityElement) {
    this.Elements.push(EntityElement);
}

EntityController.prototype.find = function (name) {
    for (var i = 0; i < this.Elements.length; i++) {
        var e = this.Elements[i];
        if (name === e.Data.Description) {
            return e;
        }
    }
    return false;
}

EntityController.prototype.removeElement = function (EntityElement) {
    for (var i = 0; i < this.Elements.length; i++) {
        var e = this.Elements[i];
        if (EntityElement === e) {
            this.Elements.splice(i, 1);
            return true;
        }
    }
    return false;
}

EntityController.prototype.renderAll = function (dt) {
    this.Elements.forEach(function (e) {
        e.handleBehaviours(dt);
    });
    this.Elements.forEach(function (e) {
        e.updatePosition(dt);
    });
    this.Elements.forEach(function (e) {
        e.draw(dt);
    });
}

EntityController.prototype.checkCollisions = function (dt) {
    var now = Date.now();
    if (this.Data.lastCollissionCheck + this.Data.collisionCheckDelay < now) {
        for (var i1 = 0; i1 < this.Elements.length; i1++) {
            var e1 = this.Elements[i1];
            
            
            for (var i2 = 0; i2 < this.Elements.length; i2++) {
                var e2 = this.Elements[i2];

                if ((i1 !== i2) &&
                        (typeof e1 !== "undefined") &&
                        (typeof e2 !== "undefined") &&
                        (e1.Data.AI.Group !== e2.Data.AI.Group) &&
                        (e1.Data.AI.State === AI_State.Alive) &&
                        (e2.Data.AI.State === AI_State.Alive) &&
                        (e1.Data.Physics.Collision) &&
                        (e2.Data.Physics.Collision)) {
                    if (e1.doesCollideWith(e2)) {
                        e1.handleCollision(e2);
                        return;
                    }
                }
            }
        }
        this.Data.lastCollissionCheck = now;
    }
}

var Entity = new EntityController;