import { Form } from '../models/form.js';
import { FormView } from '../views/formView.js';

import { CounterController } from './counterController.js';

export class FormController {
  constructor({ name = '', counter = 1, priority = 'no-priority' } = {}) {
    this.model = new Form(name, counter, priority);
    this.view = new FormView();
    this.counter = new CounterController(counter);

    this.view.bindAddTask(this.addTask.bind(this));
    this.view.bindResetCounter(this.resetCounter.bind(this));
  }

  resetCounter() {
    this.counter.reset();
  }

  addTask(taskData) {
    this.model.addTask(taskData);
  }

  init() {
    this.view.render(this.model);
  }
}
