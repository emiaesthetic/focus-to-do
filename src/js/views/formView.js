export class FormView {
  constructor() {
    this.form = document.querySelector('.form');
    this.description = this.form.querySelector('.form__input');
    this.priority = this.form.querySelector('.form__select');

    this.form.addEventListener('submit', this.submit.bind(this));
  }

  bindAddTask(handler) {
    this.addTask = handler;
  }

  submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData);
    this.addTask(taskData);
    this.form.reset();
  }

  render(taskData) {
    this.description.value = taskData.description;
    this.priority.value = taskData.priority;
  }
}
