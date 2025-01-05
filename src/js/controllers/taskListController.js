import { TaskList } from '../models/taskList.js';
import { TaskListView } from '../views/taskListView.js';

export class TaskListController {
  constructor() {
    this.model = new TaskList();
    this.view = new TaskListView();

    this.view.bindRemoveTask(this.removeTask.bind(this));
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

  init() {
    if (this.model.tasks.length === 0) {
      this.view.renderPicture();
      return;
    }

    this.view.renderTaskList(this.model.tasks);
  }
}
