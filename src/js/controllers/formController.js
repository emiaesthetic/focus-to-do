import { Form } from '../models/form.js';
import { FormView } from '../views/formView.js';

import { CounterController } from './counterController.js';

export class FormController {
  constructor({
    description = '',
    priority = 'no-priority',
    counter = 1,
  } = {}) {
    this.model = new Form(description, priority);
    this.view = new FormView();
    this.counter = new CounterController(counter);

    this.view.bindAddTask(this.addTask.bind(this));
  }

  addTask(taskData) {
    console.log(taskData);
    this.model.addTask(taskData);
  }

  init() {
    this.view.render(this.model);
  }
}
