export class Form {
  #storageKey = 'tasks';

  constructor(description, priority) {
    this.description = description;
    this.priority = priority;
  }

  #get() {
    return JSON.parse(localStorage.getItem(this.#storageKey)) || [];
  }

  #set(newTask) {
    const tasks = this.#get().filter(
      task => task.description !== newTask.description,
    );
    tasks.push(newTask);
    localStorage.setItem(this.#storageKey, JSON.stringify(tasks));
  }

  addTask(taskData) {
    Object.assign(this, taskData);
    this.#set(taskData);
  }
}
