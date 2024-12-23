import { Counter } from '../models/counter.js';
import { CounterView } from '../views/counterView.js';

export class CounterController {
  constructor(initValue = 1) {
    this.model = new Counter(initValue);
    this.view = new CounterView();

    this.view.update(this.model.getValue());
    this.view.bindDecrease(this.handleDecrease.bind(this));
    this.view.bindIncrease(this.handleIncrease.bind(this));
  }

  handleDecrease() {
    this.model.decrease();
    this.view.update(this.model.getValue());
  }

  handleIncrease() {
    this.model.increase();
    this.view.update(this.model.getValue());
  }

  init() {
    console.log(this.model.getValue());
  }
}
