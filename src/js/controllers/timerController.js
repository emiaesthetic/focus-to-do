import { Timer } from '../models/timer.js';
import { TimerView } from '../views/timerView.js';

export class TimerController {
  constructor({ taskDuration, shortBreak, longBreak, longBreakAfter }) {
    this.model = new Timer(taskDuration, shortBreak, longBreak, longBreakAfter);
    this.view = new TimerView();

    this.view.bindPause(this.pause.bind(this));
    this.view.bindContinue(this.continue.bind(this));
    this.view.bindStop(this.stop.bind(this));
    this.view.bindDone(this.done.bind(this));
    this.view.bindStart(this.start.bind(this));
  }

  update(newSettings) {
    this.model.updateSettings(newSettings);
  }

  startTimer(duration, onComplete = 'task') {
    this.model.timeRemaining = duration;

    this.startAnimation(this.model.timeRemaining);

    const intervalID = setInterval(() => {
      if (this.model.paused) {
        clearInterval(intervalID);
        return;
      }

      this.model.decrementTimeRemaining();
      this.view.updateTime(this.model.timeToString(this.model.timeRemaining));

      if (this.model.timeRemaining <= 0) {
        this.view.playSound();
        clearInterval(intervalID);

        if (onComplete === 'task') {
          this.handleTaskCompletion();
        } else if (onComplete === 'break') {
          this.handleBreakCompletion();
        }

        return;
      }
    }, 1000);
  }

  startAnimation(duration) {
    let startTime = NaN;

    const step = timestamp => {
      if (this.model.paused) {
        this.model.lastAngle = this.model.angle;
        return;
      }

      startTime ||= timestamp;
      const progress = this.model.calculateProgress(
        timestamp,
        startTime,
        duration,
      );
      this.model.angle =
        progress * (360 - this.model.lastAngle) + this.model.lastAngle;
      this.view.updateAngle(this.model.angle);

      if (this.model.angle < 360) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  start() {
    this.model.resetState();
    this.startTimer(this.model.taskDuration);
    this.view.updateTime(this.model.timeToString(this.model.taskDuration));
  }

  pause() {
    this.model.setPause();
  }

  continue() {
    this.model.unsetPause();
    this.startTimer(this.model.timeRemaining);
  }

  stop() {
    this.model.resetAnimation();
    this.view.updateAngle(this.model.angle);
  }

  done() {
    this.model.setPause();
    this.model.resetAnimation();
    this.view.updateAngle(this.model.angle);
    this.view.updateTime(this.model.timeToString(this.model.taskDuration));
  }

  startTask(task, onComplete) {
    this.view.render(task, this.model.timeToString(this.model.taskDuration));
    this.startTimer(this.model.taskDuration, onComplete);
  }

  handleTaskCompletion() {
    this.model.resetState();
    this.view.updateBtn('done');

    if (this.model.getIncrementCounter() % this.model.longBreakAfter === 0) {
      this.view.updateTime(this.model.timeToString(this.model.longBreak));
      this.model.resetBreakCounter();
      this.startTimer(this.model.longBreak, 'break');
    } else {
      this.view.updateTime(this.model.timeToString(this.model.shortBreak));
      this.model.incrementBreakCounter();
      this.startTimer(this.model.shortBreak, 'break');
    }
  }

  handleBreakCompletion() {
    this.model.setPause();
    this.model.resetAnimation();
    this.view.updateBtn('start');
    this.view.updateAngle(this.model.angle);
    this.view.updateTime(this.model.timeToString(this.model.taskDuration));
  }
}
