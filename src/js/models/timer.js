export class Timer {
  static #instance;

  constructor(taskDuration, shortBreak, longBreak, longAfterBreak) {
    if (Timer.#instance) {
      return Timer.#instance;
    }

    this.taskDuration = this.#minutesToMilliseconds(taskDuration);
    this.shortBreak = this.#minutesToMilliseconds(shortBreak);
    this.longBreak = this.#minutesToMilliseconds(longBreak);
    this.longAfterBreak = this.#minutesToMilliseconds(longAfterBreak);

    this.timeRemaining = 0;
    this.angle = 0;
    this.lastAngle = 0;
    this.paused = false;

    Timer.#instance = this;
  }

  #minutesToMilliseconds(time) {
    return time * 60 * 1000;
  }

  updateSettings({ taskDuration, shortBreak, longBreak, longAfterBreak }) {
    this.taskDuration = this.#minutesToMilliseconds(taskDuration);
    this.shortBreak = this.#minutesToMilliseconds(shortBreak);
    this.longBreak = this.#minutesToMilliseconds(longBreak);
    this.longAfterBreak = this.#minutesToMilliseconds(longAfterBreak);
  }

  getTimestampToString(timestamp) {
    const allSeconds = timestamp / 1000;
    const minutes = Math.floor(allSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (allSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  startTimer(duration, callback) {
    this.timeRemaining = duration;

    const intervalID = setInterval(() => {
      if (this.timeRemaining <= 0 || this.paused) {
        clearInterval(intervalID);
        return;
      }

      this.timeRemaining -= 1000;
      callback(this.timeRemaining);
    }, 1000);
  }

  pause() {
    this.paused = true;
  }

  continue() {
    this.paused = false;
  }

  calculateProgress(timestamp, startTime, duration) {
    const elapsed = timestamp - startTime;
    return elapsed > duration ? 1 : elapsed / duration;
  }

  resetAnimation() {
    this.timeRemaining = 0;
    this.angle = 0;
    this.lastAngle = 0;
    this.paused = false;
  }
}
