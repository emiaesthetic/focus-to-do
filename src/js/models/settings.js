export class Settings {
  static #instance;
  #storageKey = 'settings';
  #observers = [];

  constructor() {
    if (Settings.#instance) {
      return Settings.#instance;
    }

    const {
      taskDuration = 25,
      shortBreak = 5,
      longBreak = 10,
      longBreakAfter = 4,
    } = this.#get();

    this.taskDuration = taskDuration;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.longBreakAfter = longBreakAfter;

    Settings.#instance = this;
  }

  #get() {
    return JSON.parse(localStorage.getItem(this.#storageKey)) || {};
  }

  #set(newSettings) {
    localStorage.setItem(this.#storageKey, JSON.stringify(newSettings));
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

  update(newSettings) {
    Object.assign(this, newSettings);
    this.#set(newSettings);
    this.notify(newSettings);
  }
}
