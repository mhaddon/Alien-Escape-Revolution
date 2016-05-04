var AudioController = function () {
    this.constructor();
    
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = audio.ctx.createOscillator();
    this.gain = audio.ctx.createGain();
    
    return {
        add: this.add
    }
}

AudioController.prototype = Object.create(Controller.prototype);
AudioController.prototype.constructor = Controller;

var Audio = new AudioController;