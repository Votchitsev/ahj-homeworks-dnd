class Container {
  constructor(element) {
    this.element = element

    this.createTask = this.createTask.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  addListeners() {
    const addBtn = this.element.querySelector('.container-add-btn');
    addBtn.addEventListener('click', this.openForm);

    const form = document.querySelector('.popup');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = form.querySelector('input[type="text"]').value;
      this.createTask(value);
    })
  }

  openForm() {
    const form = document.querySelector('.popup');
    form.classList.add('active');
  }

  closeForm() {
    const form = document.querySelector('.popup');
    form.classList.remove('active');
    form.reset();
  }

  createTask(task) {
    const container = this.element.querySelector('.container-content');
    container.innerHTML += `<div class=task>${task}</div>`
    this.closeForm()
  }

}

export default Container;
