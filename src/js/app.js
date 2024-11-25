import '../index.html';
import '../scss/app.scss';

import { TomatoTimer } from './modules/timer.js';

const timer = new TomatoTimer('Course', 2);
console.log(timer.getID());
console.log(timer.getName());
console.log(timer.getCounter());

timer.setName('English').setCounter(1);
console.log(timer.getID());
console.log(timer.getName());
console.log(timer.getCounter());
