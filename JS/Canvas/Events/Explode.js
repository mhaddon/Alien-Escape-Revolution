var cEvent_Explode = function (dt) {
    if (this.Data.AI.State === AI_State.Alive) {
        var eExplosion = findEntity('Explosion');

        var newExplosion = new Entity('LameExplosion', {
            Data: eExplosion.Data,
            Events: eExplosion.Events,
            Behaviours: eExplosion.Behaviours
        })

        newExplosion.import({
            Data: {
                Position: {
                    X: this.Data.Position.X + (this.getModel().getWidth() / 2),
                    Y: this.Data.Position.Y + (this.getModel().getHeight() / 2)
                },
                AI: {
                    State: AI_State.Alive,
                    Protected: false
                }
            }
        });

        Entities.push(newExplosion);
    }
};