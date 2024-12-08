import '../index.html';
import '../scss/app.scss';
import './modules/animation.js';

import { Task } from './modules/task.js';
import { Tomato } from './modules/tomato.js';

const course = new Task('Course', 4);
const english = new Task('English', 2);
const reading = new Task('Reading', 1);

const tomato = new Tomato({
  taskLength: 1,
  shortBreakLength: 1,
  longBreakLength: 2,
  tasks: [course, english, reading],
});

tomato.activateTask(course.getID());
tomato.startTask();
tomato.incrementTaskCounter(course.getID());
