export class Tomato {
  #breakCounter = 0;

  constructor({
    taskLength = 25,
    shortBreakLength = 5,
    longBreakLength = 15,
    tasks = [],
  }) {
    this.taskLength = taskLength;
    this.shortBreakLength = shortBreakLength;
    this.longBreakLength = longBreakLength;
    this.tasks = tasks;
    this.currentTask = null;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  activateTask(taskID) {
    this.currentTask = this.findTaskByID(taskID);
  }

  findTaskByID(taskID) {
    const task = this.tasks.find(task => task.getID() === taskID);
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found.`);
    }
    return task;
  }

  startTask() {
    if (!this.currentTask) {
      throw new Error('There is no active task.');
    }

    console.log(`Starting to focus the task "${this.currentTask.getName()}"`);

    setTimeout(() => {
      console.log(`Completing the task focus "${this.currentTask.getName()}"`);
      this.incrementBreakCounter();
      this.startBreak();
    }, this.taskLength * 1000);
  }

  incrementBreakCounter() {
    this.#breakCounter += 1;
  }

  startBreak() {
    const [prefix, length] =
      this.#breakCounter % 4
        ? ['Short', this.shortBreakLength]
        : ['Long', this.longBreakLength];

    console.log(`${prefix} break is starting...`);
    setTimeout(() => {
      console.log(`${prefix} break is over.`);
    }, length * 1000);
  }

  incrementTaskCounter(taskID) {
    const task = this.findTaskByID(taskID);
    task.incrementCounter();
  }
}
