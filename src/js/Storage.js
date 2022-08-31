class Storage {
  constructor() {
    this.storage = localStorage;
  }

  save() {
    let data = this.getTasks();
    data = this.toString(data);
    this.storage.setItem('dnd', data);
  }

  load() {
    let data = this.storage.getItem('dnd');
    data = this.toObject(data);
    return data;
  }

  getTasks() {
    const containers = document.querySelectorAll('.container-content');

    const result = {};

    for (let i = 0; i < containers.length; i += 1) {
      const container = containers.item(i);
      const title = container.parentNode.querySelector('.container-title').textContent;
      const taskItems = container.querySelectorAll('.task');

      result[title] = [];

      for (let j = 0; j < taskItems.length; j += 1) {
        const taskContent = taskItems.item(j).textContent.replace(/\u{000D7}/u, '');
        result[title].push(taskContent);
      }
    }

    return result;
  }

  toString(data) {
    return JSON.stringify(data);
  }

  toObject(data) {
    return JSON.parse(data);
  }

  checkStorage() {
    if (this.storage.getItem('dnd')) {
      return true;
    }
    return false;
  }
}

export default Storage;
