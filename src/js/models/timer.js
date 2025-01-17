export class Timer {
  static #instance;
  #breakCounter = 1;
  #observers = [];

  constructor(taskDuration, shortBreak, longBreak, longBreakAfter) {
    if (Timer.#instance) {
      return Timer.#instance;
    }

    this.taskDuration = this.#minutesToMilliseconds(taskDuration);
    this.shortBreak = this.#minutesToMilliseconds(shortBreak);
    this.longBreak = this.#minutesToMilliseconds(longBreak);
    this.longBreakAfter = longBreakAfter;

    this.timeRemaining = 0;
    this.angle = 0;
    this.lastAngle = 0;
    this.paused = false;

    Timer.#instance = this;
  }

  #minutesToMilliseconds(time) {
    return time * 60 * 1000;
  }

  updateSettings({ taskDuration, shortBreak, longBreak, longBreakAfter }) {
    this.taskDuration = this.#minutesToMilliseconds(taskDuration);
    this.shortBreak = this.#minutesToMilliseconds(shortBreak);
    this.longBreak = this.#minutesToMilliseconds(longBreak);
    this.longBreakAfter = longBreakAfter;
  }

  timeToString(timestamp) {
    const allSeconds = timestamp / 1000;
    const minutes = Math.floor(allSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (allSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  decrementTimeRemaining() {
    this.timeRemaining -= 1000;
  }

  setPause() {
    this.paused = true;
  }

  unsetPause() {
    this.paused = false;
  }

  resetAnimation() {
    this.angle = 0;
    this.lastAngle = 0;
  }

  resetState() {
    this.timeRemaining = 0;
    this.paused = false;
    this.resetAnimation();
  }

  getIncrementCounter() {
    return this.#breakCounter;
  }

  incrementBreakCounter() {
    this.#breakCounter += 1;
  }

  resetBreakCounter() {
    this.#breakCounter = 1;
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers.filter(item => item !== observer);
  }

  notify(newSettings) {
    this.#observers.forEach(observer => observer(newSettings));
  }
}
