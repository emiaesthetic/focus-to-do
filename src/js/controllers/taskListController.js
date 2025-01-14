import { TaskList } from '../models/taskList.js';
import { TaskListView } from '../views/taskListView.js';

import { SettingsController } from './settingsController.js';
import { TimerController } from './timerController.js';

export class TaskListController {
  constructor() {
    this.model = new TaskList();
    this.view = new TaskListView();

    this.settings = new SettingsController();
    this.settings.init();
    this.settings.model.subscribe(newSettings =>
      this.timer.update(newSettings),
    );

    this.timer = new TimerController(this.settings.model);
    this.timer.model.subscribe(() => {
      this.updateTasks();
    });

    this.view.bindRemoveTask(this.removeTask.bind(this));
    this.view.bindStartTask(this.startTask.bind(this));
  }

  addTask(taskData) {
    const task = this.model.addTask(taskData);
    this.view.renderTask(task);
  }

  removeTask(taskID) {
    this.model.removeTask(taskID);

    if (this.model.tasks.length === 0) {
      this.view.renderPicture();
    }
  }

  startTask(taskID) {
    this.model.currentTask = this.model.getCurrentTask(taskID);
    this.timer.startTask(this.model.currentTask);
  }

  updateTasks() {
    this.model.updatePomodoroDone();
    this.model.currentTask.incrementPomodoroCount();
    this.view.updatePomodoroCount(this.model.currentTask);
  }

  init() {
    if (this.model.tasks.length === 0) {
      this.view.renderPicture();
      return;
    }

    this.view.renderTaskList(this.model.tasks);
  }
}
