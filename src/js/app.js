import Container from './Container';
import DragnDrop from './DnD';
import Storage from './Storage';

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.container');
  const storage = new Storage();
  const filledStorage = storage.checkStorage();
  let data;

  if (filledStorage) {
    data = storage.load();
  }

  for (let i = 0; i < containers.length; i += 1) {
    const container = new Container(containers.item(i));
    container.addListeners();
    if (data) {
      const containerTitle = container.element.querySelector('.container-title').textContent;
      const tasks = data[containerTitle];
      tasks.forEach((task) => {
        container.createTask(task, container.element.querySelector('.container-content'));
      });
    }
  }

  const dragnDrop = new DragnDrop();
  dragnDrop.init();

  window.addEventListener('beforeunload', () => {
    storage.save();
  });
});
