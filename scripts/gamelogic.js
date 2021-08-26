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
var sprites = [];

const placeProductionFacilityOnKey = (keycode) => {
    var key = document.getElementById(keycode);
    if (key) {
        var item = key.querySelector('.item');
        if (item) {
            item.src = 'res/img/3d/production.png';
            item.classList.add('active');
        }
    }
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
    }
};
