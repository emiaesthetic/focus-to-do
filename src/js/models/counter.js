export class Counter {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
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
