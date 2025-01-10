import { Timer } from '../models/timer.js';
import { TimerView } from '../views/timerView.js';

export class TimerController {
  constructor({ taskDuration, shortBreak, longBreak, longAfterBreak }) {
    this.model = new Timer(taskDuration, shortBreak, longBreak, longAfterBreak);
    this.view = new TimerView();
  }

  update(newSettings) {
    this.model.update(newSettings);
  }

  render(task) {
    this.view.open();
    this.view.render(task, this.model);
  }
}
