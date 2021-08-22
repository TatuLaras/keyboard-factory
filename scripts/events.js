var context = new (window.AudioContext || window.webkitAudioContext)();

const playSound = (keycode) => {
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'triangle'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 100 + keycode * 2; // Hz
    osc.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 0.03); // stop 2 seconds after the current time
};

document.addEventListener(
    'keydown',
    (event) => {
        var key = document.getElementById(event.keyCode);
        key.classList.add('active');
        key.classList.remove('fade');
        playSound(event.keyCode);
        setTimeout(() => {
            key.classList.add('fade');
        }, 10);

        if (key.classList.contains('num-slot')) {
            for (var i = 0; i <= 9; i++) {
                if (key.classList.contains('slot-' + i)) {
                    changeNumbarItem(i);
                    break;
                }
            }
        }
    },
    false
);

document.addEventListener(
    'keyup',
    (event) => {
        var key = document.getElementById(event.keyCode);
        key.classList.remove('active');
    },
    false
);
