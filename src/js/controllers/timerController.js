import { Timer } from '../models/timer.js';
import { TimerView } from '../views/timerView.js';

export class TimerController {
  constructor({ taskDuration, shortBreak, longBreak, longAfterBreak }) {
    this.model = new Timer(taskDuration, shortBreak, longBreak, longAfterBreak);
    this.view = new TimerView();

    this.view.bindPauseTimer(this.pauseTimer.bind(this));
    this.view.bindContinueTimer(this.continueTimer.bind(this));
    this.view.bindStopTimer(this.stopTimer.bind(this));
  }

  update(newSettings) {
    this.model.updateSettings(newSettings);
  }

  startTimer(duration) {
    this.model.startTimer(duration, timeRemaining => {
      this.view.updateTime(this.model.getTimestampToString(timeRemaining));
      if (timeRemaining <= 0) {
        this.view.playSound();
      }
    });
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

  pauseTimer() {
    this.model.pause();
  }

  continueTimer() {
    this.model.continue();
    this.startTimer(this.model.timeRemaining);
    this.startAnimation(this.model.timeRemaining);
  }

  stopTimer() {
    this.view.updateAngle(0);
    this.model.resetAnimation();
  }

  render(task) {
    this.view.render(
      task,
      this.model.getTimestampToString(this.model.taskDuration),
    );
    this.startTimer(this.model.taskDuration);
    this.startAnimation(this.model.taskDuration);
  }
}
