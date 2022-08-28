class Container {
  constructor(element) {
    this.element = element;
    this.currentContainer = this.element.querySelector('.container-content');
    this.form = this.element.querySelector('.create-task');
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

    window.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.closeForm();
      }
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
    container.innerHTML += `<div class=task>${task}<span class="close">&#215</span></div>`;
    const createdTask = container.lastElementChild;
    this.addTaskListeners(createdTask);

    this.closeForm();
  }

  addTaskListeners(task) {
    const createdTask = task;
    const closeEl = createdTask.querySelector('.close');

    createdTask.addEventListener('mouseenter', () => {
      closeEl.classList.add('active');
    });

    createdTask.addEventListener('mouseleave', () => {
      closeEl.classList.remove('active');
    });

    closeEl.addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });
  }
}

export default Container;
