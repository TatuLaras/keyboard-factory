// Remember: in the UI 0 is on the right
const itemInfoTexts = [
    '<b>Delete facilities</b>', // 0
    '<b>Use facilities</b>', // 2
    'Place a <b>production facility</b>', // 2
    'Place a <b>conveyor belt</b>', //3
    'Do nothing', //4
    '<b>Mine materials</b> by typing the name', //5
    'Do nothing', //6
    'Do nothing', //7
    'Do nothing', //8
    'Do nothing', //9
];

var selectedAction = 0;
var infoTextElm = document.getElementById('numbar-details');

var resourceTypes = ['IRON', 'COPPER'];

var resourceAmounts = {
    iron: 0,
    copper: 0,
};

var facilityBuildResources = {
    production: {
        iron: 10,
    },
    conveyor: {
        iron: 5,
        copper: 5,
    },
};

const placeFacilityOnKey = (keycode, facility) => {
    var key = document.getElementById(keycode);
    if (key) {
        var item = key.querySelector('.item');
        if (item) {
            item.classList = '';
            item.classList.add('in-use');
            item.classList.add('item');
            item.classList.add(facility);
        }
    }
};

const removeFacilityOnKey = (keycode) => {
    var key = document.getElementById(keycode);
    if (key) {
        var item = key.querySelector('.item');
        if (item) {
            item.classList.remove('in-use');
        }
    }
};

var mineString = '';

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
        resourceAmounts[mineString.toLowerCase()] += 1;
        var counter = document.querySelector('#resources #' + mineString.toLowerCase());
        if (counter)
            counter.innerHTML =
                mineString.charAt(0) +
                mineString.slice(1).toLowerCase() +
                ': ' +
                resourceAmounts[mineString.toLowerCase()];

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
        // Delete facility
        case 0:
            removeFacilityOnKey(keycode);
            break;

        // Place production facility
        case 2:
            placeFacilityOnKey(keycode, 'production');
            break;

        // Place conveyor facility
        case 3:
            placeFacilityOnKey(keycode, 'conveyor');
            break;

        // Add letter to type mining
        case 5:
            mine(keycode);
            break;
    }
};
