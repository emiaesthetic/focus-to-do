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

  bindPauseTimer(handler) {
    this.pauseTimer = handler;
  }

  bindContinueTimer(handler) {
    this.continueTimer = handler;
  }

  bindStopTimer(handler) {
    this.stopTimer = handler;
  }

  handleBtnClick({ target }) {
    if (target.dataset.state === 'pause') {
      this.button.textContent = 'Continue';
      this.button.dataset.state = 'continue';
      this.stopBtn.classList.remove('timer__button--hide');
      this.pauseTimer();
    } else if (target.dataset.state === 'continue') {
      this.button.textContent = 'Pause';
      this.button.dataset.state = 'pause';
      this.stopBtn.classList.add('timer__button--hide');
      this.continueTimer();
    }
  }

  handleStopBtnClick() {
    this.stopBtn.classList.add('timer__button--hide');
    this.button.textContent = 'Pause';
    this.button.dataset.state = 'pause';
    this.stopTimer();
    this.close();
  }

  render(task, startTime) {
    this.open();
    this.title.textContent = task.name;
    this.time.textContent = startTime;
  }
}
