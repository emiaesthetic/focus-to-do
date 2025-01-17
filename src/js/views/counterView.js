export class CounterView {
  constructor() {
    this.counter = document.querySelector('.counter');
    this.alarms = this.counter.querySelectorAll('.counter__alarm');
    this.togglePopupBtn = this.counter.querySelector('.counter__toggle-popup');
    this.popup = this.counter.querySelector('.counter__popup');
    this.popupDisplay = this.counter.querySelector('.counter__display');
    this.popupInput = this.counter.querySelector('.counter__input');
    this.increaseBtn = this.counter.querySelector('.counter__increase');
    this.decreaseBtn = this.counter.querySelector('.counter__decrease');

    this.togglePopupBtn.addEventListener('click', this.togglePopup.bind(this));
    this.handleEscKey = this.handleEscKey.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  togglePopup() {
    this.popup.classList.toggle('counter__popup--is-open');
    this.updatePopupState();
  }

  updatePopupState() {
    const isOpen = this.popup.classList.contains('counter__popup--is-open');
    this.updateAriaExpanded(isOpen);
    this.updateToggleButtonLabel(isOpen);
    this.toggleEventListeners(isOpen);
  }

  updateAriaExpanded(isExpanded) {
    this.popup.ariaExpanded = isExpanded;
  }

  updateToggleButtonLabel(isOpen) {
    this.togglePopupBtn.ariaLabel = isOpen
      ? 'Close counter popup'
      : 'Open counter popup';
  }

  toggleEventListeners(shouldAdd) {
    if (shouldAdd) {
      this.attachPopupEventListeners();
    } else {
      this.detachPopupEventListeners();
    }
  }

  attachPopupEventListeners() {
    document.addEventListener('keydown', this.handleEscKey);
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('focusout', this.handleFocusOut);
  }

  detachPopupEventListeners() {
    document.removeEventListener('keydown', this.handleEscKey);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('focusout', this.handleFocusOut);
  }

  handleEscKey(event) {
    if (event.key === 'Escape') {
      this.togglePopup();
    }
  }

  handleClickOutside(event) {
    if (
      !this.popup.contains(event.target) &&
      !this.togglePopupBtn.contains(event.target)
    ) {
      this.togglePopup();
    }
  }

  handleFocusOut(event) {
    if (!this.popup.contains(event.relatedTarget)) {
      this.togglePopup();
    }
  }

  bindAlarmClick(handler) {
    this.alarms.forEach((alarm, index) => {
      alarm.addEventListener('click', () => {
        this.highlightAlarmsByIndex(index);
        handler(index + 1);
      });
    });
  }

  highlightAlarmsByIndex(index) {
    this.alarms.forEach((label, currentIndex) => {
      label.classList.toggle('selected', currentIndex <= index);
    });
  }

  highlightAlarmsByValue(value) {
    this.highlightAlarmsByIndex(value - 1);
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
