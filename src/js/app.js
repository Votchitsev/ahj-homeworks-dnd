import Container from './Container';
import DragnDrop from './DnD';

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.container');

  for (let i = 0; i < containers.length; i += 1) {
    const container = new Container(containers.item(i));
    container.addListeners();
  }

  const dragnDrop = new DragnDrop();
  dragnDrop.init();
});
