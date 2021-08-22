var context = new (window.AudioContext || window.webkitAudioContext)();

const playSound = (keycode) => {
    var osc = context.createOscillator(); // instantiate an oscillator
    osc.type = 'triangle'; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = 100 + keycode * 2; // Hz
    osc.connect(context.destination); // connect it to the destination
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 0.03); // stop 2 seconds after the current time
};

const buttonDown = (id) => {
    var key = document.getElementById(id);
    key.classList.add('active');
    key.classList.remove('fade');
    playSound(id);
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
};

document.querySelectorAll('.key').forEach((k) => {
    k.addEventListener(
        'mousedown',
        (event) => {
            buttonDown(event.target.id);
        },
        false
    );
});

document.addEventListener(
    'mouseup',
    (event) => {
        document.querySelectorAll('.key').forEach((k) => k.classList.remove('active'));
    },
    false
);

document.addEventListener(
    'keydown',
    (event) => {
        buttonDown(event.keyCode);
    },
    false
);

document.addEventListener(
    'keyup',
    (event) => {
        document.getElementById(event.keyCode).classList.remove('active');
    },
    false
);

setInterval(() => {
    document.getElementById('keyboard').classList.toggle('second-image');
}, 125);
