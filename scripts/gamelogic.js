var selectedItem = 1;

const changeNumbarItem = (num) => {
    selectedItem = num;
    document.querySelectorAll('.num-slot').forEach((s) => s.classList.remove('selected'));
    document.querySelector('.slot-' + num).classList.add('selected');
};
