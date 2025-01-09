class Task {
  constructor({ id, name, counter, priority }) {
    this.id = id || this.#generateUniqueID();
    this.name = name;
    this.counter = counter;
    this.priority = priority;
  }

  #generateUniqueID() {
    return Math.random()
      .toString()
      .substring(2, 11)
      .replace(/^0+/, '')
      .padEnd(9, '0');
  }
}

export class TaskList {
  #storageKey = 'tasks';
  static #instance;

  constructor() {
    if (TaskList.#instance) {
      return TaskList.#instance;
    }

    this.currentTask = null;
    this.tasks = this.#getTasks().map(taskData => new Task(taskData));
    TaskList.#instance = this;
  }

  #getTasks() {
    return JSON.parse(localStorage.getItem(this.#storageKey)) || [];
  }

  #setTask(taskData) {
    const tasks = this.#getTasks();
    tasks.push(taskData);
    localStorage.setItem(this.#storageKey, JSON.stringify(tasks));
  }

  #removeTask(taskID) {
    localStorage.setItem(
      this.#storageKey,
      JSON.stringify(this.#getTasks().filter(task => task.id !== taskID)),
    );
  }

  getTask(id) {
    return this.tasks.find(task => task.id === id);
  }

  addTask(taskData) {
    const task = new Task(taskData);
    this.tasks.push(task);
    this.#setTask(task);
    return task;
  }

  removeTask(taskID) {
    this.tasks = this.tasks.filter(task => task.id !== taskID);
    this.#removeTask(taskID);
  }
}
