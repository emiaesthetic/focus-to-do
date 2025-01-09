export class Timer {
  static #instance;

  constructor(taskDuration, shortBreak, longBreak, longAfterBreak) {
    if (Timer.#instance) {
      return Timer.#instance;
    }

    this.taskDuration = taskDuration;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.longAfterBreak = longAfterBreak;

    Timer.#instance = this;
  }

  update({ taskDuration, shortBreak, longBreak, longAfterBreak }) {
    this.taskDuration = taskDuration;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.longAfterBreak = longAfterBreak;
  }
}
