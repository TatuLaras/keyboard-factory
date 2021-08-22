// Remember: in the UI 0 is on the right
const itemInfoTexts = [
    '<b>Delete items</b>',
    'Place a <b>production facility</b>',
    'Place a <b>conveyor belt</b>',
    'Place an <b>exporter</b>',
];
var selectedItem = 1;
var infoTextEl = document.getElementById('numbar-details');

const changeNumbarItem = (num) => {
    selectedItem = num;
    document.querySelectorAll('.num-slot').forEach((s) => s.classList.remove('selected'));
    document.querySelector('.slot-' + num).classList.add('selected');
    if (num < itemInfoTexts.length && num >= 0) {
        infoTextEl.innerHTML = itemInfoTexts[num];
    }
};
