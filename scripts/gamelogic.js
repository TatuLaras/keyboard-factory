// Remember: in the UI 0 is on the right
const itemInfoTexts = [
    '<b>Delete items</b>', // 0
    '<b>Use keys</b>', // 2
    'Place a <b>production facility</b>', // 2
    'Place a <b>conveyor belt</b>', //3
    'Place an <b>exporter</b>', //4
    '<b>Mine materials</b>', //5
];

var selectedAction = 0;
var infoTextElm = document.getElementById('numbar-details');

// Todo dict of images
var sprites = {
    production: 'res/img/3d/production.png',
};

const placeProductionFacilityOnKey = (keycode) => {
    var key = document.getElementById(keycode);
    if (key) {
        var item = key.querySelector('.item');
        if (item) {
            item.src = sprites['production'];
            item.classList.add('in-use');
        }
    }
};

var mineString = '';

var resourceTypes = ['IRON', 'COPPER'];
var resourceAmounts = {
    IRON: 0,
    COPPER: 0,
};

// Mine by typing
const mine = (keycode) => {
    mineString += String.fromCharCode(keycode);

    var partialMatch = false;
    var completeMatch = false;

    resourceTypes.forEach((rt) => {
        if (rt.slice(0, mineString.length) == mineString) {
            if (rt.length == mineString.length) {
                completeMatch = true;
            } else {
                partialMatch = true;
            }
        }
    });

    if (completeMatch == true) {
        // Update data
        resourceAmounts[mineString] += 1;
        var counter = document.querySelector('#resources #' + mineString.toLowerCase());
        if (counter)
            counter.innerHTML =
                mineString.charAt(0) +
                mineString.slice(1).toLowerCase() +
                ': ' +
                resourceAmounts[mineString];

        mineString = '';
    }

    // If word not going on any path, erase
    if (partialMatch == false) mineString = String.fromCharCode(keycode);
};

// Called from events
const changeNumbarItem = (num) => {
    selectedAction = num;
    document.querySelectorAll('.num-slot').forEach((s) => s.classList.remove('selected'));
    document.querySelector('.slot-' + num).classList.add('selected');
    if (num < itemInfoTexts.length && num >= 0) {
        infoTextElm.innerHTML = itemInfoTexts[num];
    }
};

// Called from events
const performSelectedActionForKey = (keycode) => {
    switch (selectedAction) {
        // Place facility
        case 2:
            placeProductionFacilityOnKey(keycode);
            break;

        case 5:
            mine(keycode);
            break;
    }
};
