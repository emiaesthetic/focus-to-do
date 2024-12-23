export class CounterView {
  constructor() {
    this.counterDisplay = document.querySelector('.counter__display');
    this.counterInput = document.querySelector('.counter__input');
    this.decreaseBtn = document.querySelector('.counter__decrease');
    this.increaseBtn = document.querySelector('.counter__increase');
  }

  bindDecrease(handler) {
    this.decreaseBtn.addEventListener('click', handler);
  }

  bindIncrease(handler) {
    this.increaseBtn.addEventListener('click', handler);
  }

  update(value) {
    this.counterDisplay.textContent = value;
    this.counterInput.value = value;
  }
}
