export class CounterView {
  constructor() {
    this.counter = document.querySelector('.counter');
    this.labels = this.counter.querySelectorAll('.counter__label');
    this.radios = this.counter.querySelectorAll('.counter__radio');
    this.openPopupBtn = this.counter.querySelector('.counter__open-popup');
    this.popup = this.counter.querySelector('.counter__popup');
    this.popupDisplay = this.counter.querySelector('.counter__display');
    this.popupInput = this.counter.querySelector('.counter__input');
    this.increaseBtn = this.counter.querySelector('.counter__increase');
    this.decreaseBtn = this.counter.querySelector('.counter__decrease');

    this.openPopupBtn.addEventListener('click', this.togglePopup.bind(this));
  }

  togglePopup() {
    this.popup.classList.toggle('counter__popup--is-open');
  }

  bindRadioChange(handler) {
    this.radios.forEach((radio, index) => {
      this.handleRadioChange(radio, index, handler);
    });
  }

  highlightLabelsByIndex(index) {
    this.labels.forEach((label, currentIndex) => {
      label.classList.toggle('selected', currentIndex <= index);
    });
  }

  handleRadioChange(radio, index, handler) {
    radio.addEventListener('change', () => {
      this.highlightLabelsByIndex(index);
      handler(parseInt(radio.value, 10));
    });
  }

  highlightLabelsByValue(value) {
    this.highlightLabelsByIndex(value - 1);
  }

  bindDecrease(handler) {
    this.decreaseBtn.addEventListener('click', handler);
  }

  bindIncrease(handler) {
    this.increaseBtn.addEventListener('click', handler);
  }

  update(value) {
    this.popupDisplay.textContent = value;
    this.popupInput.value = value;
  }
}
