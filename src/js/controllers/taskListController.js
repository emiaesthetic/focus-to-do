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

    this.timer = new TimerController(this.settings.model);

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
    const task = this.model.getTask(taskID);
    this.timer.render(task);
  }

  init() {
    if (this.model.tasks.length === 0) {
      this.view.renderPicture();
      return;
    }

    this.view.renderTaskList(this.model.tasks);
  }
}
