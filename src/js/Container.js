class Container {
  constructor(element) {
    this.element = element;
    this.currentContainer = this.element.querySelector('.container-content');
    this.form = this.element.querySelector('.popup');
    this.addBtn = this.element.querySelector('.container-add-btn');

    this.createTask = this.createTask.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  addListeners() {
    this.addBtn.addEventListener('click', this.openForm);

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { value } = this.element.querySelector('input[type="text"]');
      this.createTask(value, this.currentContainer);
    });
  }

  openForm() {
    this.form.classList.add('active');
  }

  closeForm() {
    this.form.classList.remove('active');
    this.form.reset();
  }

  createTask(task, containerEl) {
    const container = containerEl;
    container.innerHTML += `<div class=task>${task}</div>`;
    this.closeForm();
  }
}

export default Container;
