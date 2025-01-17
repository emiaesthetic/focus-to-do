import '../index.html';
import '../scss/app.scss';
import '../img/no-tasks.svg';
import '../audio/ding.mp3';

import { FormController } from './controllers/formController.js';
import { TaskListController } from './controllers/taskListController.js';

const formController = new FormController();
formController.init();

const taskListController = new TaskListController();
taskListController.init();

formController.model.subscribe(data => taskListController.addTask(data));
