export class Form {
  #observers = [];

  constructor(description, counter, priority) {
    this.description = description;
    this.counter = counter;
    this.priority = priority;
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  unsubscribe(observer) {
    this.#observers.filter(item => item !== observer);
  }

  notify(taskData) {
    this.#observers.forEach(observer => observer(taskData));
  }

  addTask(taskData) {
    Object.assign(this, taskData);
    this.notify(taskData);
  }
}
