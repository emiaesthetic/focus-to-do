import '../index.html';
import '../scss/app.scss';
import '../img/no-tasks.svg';
import './utils/animation.js';

import { SettingsController } from './controllers/settingsController.js';
import { FormController } from './controllers/formController.js';
import { TaskListController } from './controllers/taskListController.js';

const settingsController = new SettingsController();
settingsController.init();

const formController = new FormController();
formController.init();

const taskListController = new TaskListController();
taskListController.init();

formController.model.subscribe(data => taskListController.addTask(data));
