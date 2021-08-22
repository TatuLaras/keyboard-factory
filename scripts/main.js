const findAttatchedObjectWithClass = (el, cls) => {
    if (!el.classList.contains(cls)) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    } else {
        return el;
    }
};
