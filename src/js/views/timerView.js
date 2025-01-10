export class TimerView {
  constructor() {
    this.timer = document.querySelector('.timer');
    this.overlay = this.timer.closest('.overlay');
    this.title = this.timer.querySelector('.timer__title');
    this.progress = this.timer.querySelector('.timer__progress');
    this.time = this.timer.querySelector('.timer__time');
    this.button = this.timer.querySelector('.timer__button');
    this.audio = new Audio('../audio/ding.mp3');
  }

  open() {
    this.overlay.classList.add('overlay--is-open');
  }

  close() {
    this.overlay.classList.remove('overlay--is-open');
  }

  animation(duration) {
    let startTime = NaN;
    const that = this;

    requestAnimationFrame(function step(timestamp) {
      startTime ||= timestamp;
      const progress =
        timestamp - startTime > duration
          ? 1
          : (timestamp - startTime) / duration;

      const angle = progress * 360;
      that.progress.style.setProperty('--angle', `${angle}deg`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    });
  }

  updateTime(duration, timeRemaining) {
    timeRemaining = timeRemaining || duration / 1000;
    this.time.textContent = this.#timeToString(timeRemaining);

    const intervalID = setInterval(() => {
      timeRemaining -= 1;
      this.time.textContent = this.#timeToString(timeRemaining);

      if (timeRemaining < 0) {
        this.time.textContent = '00:00';
        this.playSound();
        clearInterval(intervalID);
      }
    }, 1000);
  }

  playSound() {
    this.audio.play();
  }

  #timeToString(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  render(task, settings) {
    this.title.textContent = task.name;
    const timestamp = settings.taskDuration * 60 * 1000;
    this.animation(timestamp);
    this.updateTime(timestamp);
  }
}
