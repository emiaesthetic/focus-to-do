export class Counter {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  updateValue(newValue) {
    this.value = newValue;
  }

  decrease() {
    if (this.value > 1) {
      this.value -= 1;
    }
  }

  increase() {
    this.value += 1;
  }
}
