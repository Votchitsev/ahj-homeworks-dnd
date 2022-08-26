import Container from './Container';

const containers = document.querySelectorAll('.container');

const todoContainer = new Container(containers[0], 0);
todoContainer.addListeners();

const inProgressContainer = new Container(containers[1], 1);
inProgressContainer.addListeners();

const doneContainer = new Container(containers[2], 2);
doneContainer.addListeners();
