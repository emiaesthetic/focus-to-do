import { SelectView } from './selectView.js';

export class FormView {
  constructor() {
    this.form = document.querySelector('.form');
    this.name = this.form.querySelector('.form__input');
    this.priority = new SelectView();

    this.form.addEventListener('submit', this.submit.bind(this));
  }

  bindAddTask(handler) {
    this.addTask = handler;
  }

  submit(event) {
    event.preventDefault();

    if (this.name.value.trim() === '') {
      console.warn('min length must be > 0');
      return;
    }

    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData);
    this.addTask(taskData);
    this.reset();
  }

  bindResetCounter(handler) {
    this.resetCounter = handler;
  }

  reset() {
    this.form.reset();
    this.priority.reset();
    this.resetCounter();
  }

  render(taskData) {
    this.name.value = taskData.name;
    this.priority.value = taskData.priority;
  }
}
