// import Sortable from './node_modules/sortablejs';

const list = document.getElementById('items');

new Sortable(list, {
    animation: 150,
    ghostClass: 'blue-background-class'
});