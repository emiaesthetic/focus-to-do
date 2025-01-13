export class TimerView {
  constructor() {
    this.timer = document.querySelector('.timer');
    this.overlay = this.timer.closest('.overlay');
    this.title = this.timer.querySelector('.timer__title');
    this.progress = this.timer.querySelector('.timer__progress');
    this.time = this.timer.querySelector('.timer__time');
    this.button = this.timer.querySelector('.timer__button');
    this.stopBtn = this.timer.querySelector('.timer__button:nth-child(2)');
    this.audio = new Audio('../audio/ding.mp3');

    this.button.addEventListener('click', this.handleBtnClick.bind(this));
    this.stopBtn.addEventListener('click', this.handleStopBtnClick.bind(this));
  }

  open() {
    this.overlay.classList.add('overlay--is-open');
  }

  close() {
    this.overlay.classList.remove('overlay--is-open');
  }

  updateAngle(angle) {
    this.progress.style.setProperty('--angle', `${angle}deg`);
  }

  updateTime(timeRemaining) {
    this.time.textContent = timeRemaining;
  }

  playSound() {
    this.audio.play();
  }

  bindStart(handler) {
    this.start = handler;
  }

  bindPause(handler) {
    this.pause = handler;
  }

  bindContinue(handler) {
    this.continue = handler;
  }

  bindStop(handler) {
    this.stop = handler;
  }

  bindDone(handler) {
    this.done = handler;
  }

  handleBtnClick({ target }) {
    switch (target.dataset.state) {
      case 'start':
        this.updateBtn('pause');
        this.start();
        break;

      case 'pause':
        this.updateBtn('continue');
        this.showStopButton();
        this.pause();
        break;

      case 'continue':
        this.updateBtn('pause');
        this.hideStopButton();
        this.continue();
        break;

      case 'done':
        this.updateBtn('start');
        this.done();
        break;

      default:
        break;
    }
  }

  showStopButton() {
    this.stopBtn.classList.remove('timer__button--hide');
  }

  hideStopButton() {
    this.stopBtn.classList.add('timer__button--hide');
  }

  handleStopBtnClick() {
    this.hideStopButton();
    this.updateBtn('pause');
    this.stop();
    this.close();
  }

  updateBtn(state) {
    if (typeof state === 'string') {
      this.button.textContent = state.toLocaleUpperCase();
      this.button.dataset.state = state.toLocaleLowerCase();
    }
  }

  render(task, startTime) {
    this.open();
    this.title.textContent = task.name;
    this.updateTime(startTime);
  }
}
