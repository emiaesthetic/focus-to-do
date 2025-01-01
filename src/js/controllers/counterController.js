import { Counter } from '../models/counter.js';
import { CounterView } from '../views/counterView.js';

export class CounterController {
  constructor(initValue = 1) {
    this.model = new Counter(initValue);
    this.view = new CounterView();

    this.view.update(this.model.getValue());
    this.view.bindRadioChange(this.handleRadioChange.bind(this));
    this.view.bindDecrease(this.handleDecrease.bind(this));
    this.view.bindIncrease(this.handleIncrease.bind(this));
  }

  handleRadioChange(newValue) {
    this.model.updateValue(newValue);
    this.view.update(this.model.getValue());
  }

  handleDecrease() {
    this.model.decrease();
    this.view.highlightLabelsByValue(this.model.getValue());
    this.view.update(this.model.getValue());
  }

  handleIncrease() {
    this.model.increase();
    this.view.highlightLabelsByValue(this.model.getValue());
    this.view.update(this.model.getValue());
  }
}
