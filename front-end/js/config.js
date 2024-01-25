const apiUrl = 'http://localhost:3000/api/teddies/';

const createTag = (tag, className, content, parent, attributes = {}) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = content;
    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
};