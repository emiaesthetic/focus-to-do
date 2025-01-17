export class TimerView {
  #lastFocusedElement = null;

  constructor() {
    this.timer = document.querySelector('.timer');
    this.overlay = this.timer.closest('.overlay');
    this.container = this.timer.closest('.overlay__container');
    this.header = this.timer.querySelector('.timer__header');
    this.progress = this.timer.querySelector('.timer__progress');
    this.time = this.timer.querySelector('.timer__time');
    this.closeBtn = this.timer.querySelector('.timer__close-button');
    this.button = this.timer.querySelector('.timer__button');
    this.stopBtn = this.timer.querySelector('.timer__button:nth-child(2)');
    this.audio = new Audio('../audio/ding.mp3');

    this.button.addEventListener('click', this.handleBtnClick.bind(this));
    this.stopBtn.addEventListener('click', this.handleStopBtnClick.bind(this));
    this.closeBtn.addEventListener('click', () => {
      this.handleCrossBtnClick();
    });
    this.overlay.addEventListener('click', ({ target }) => {
      if (target === this.overlay || target === this.container) {
        this.handleCrossBtnClick();
      }
    });
  }

  open() {
    this.overlay.classList.add('overlay--is-open');
    this.overlay.setAttribute('aria-hidden', 'false');
    this.closeBtn.focus();
  }

  close() {
    this.overlay.classList.remove('overlay--is-open');
    this.overlay.setAttribute('aria-hidden', 'true');
    this.#lastFocusedElement.focus();
  }

  handleCrossBtnClick() {
    this.updateBtn('pause');
    this.pause();
    this.close();
  }

  updateAngle(angle) {
    this.progress.style.setProperty('--angle', `${angle}deg`);
  }

  updateTime(timeRemaining) {
    this.time.textContent = timeRemaining;
  }

  playSound() {
    this.audio.play();
  }

  bindStart(handler) {
    this.start = handler;
  }

  bindPause(handler) {
    this.pause = handler;
  }

  bindContinue(handler) {
    this.continue = handler;
  }

  bindDone(handler) {
    this.done = handler;
  }

  handleBtnClick({ target }) {
    switch (target.dataset.state) {
      case 'start':
        this.updateBtn('pause');
        this.start();
        break;

      case 'pause':
        this.updateBtn('continue');
        this.showStopButton();
        this.pause();
        break;

      case 'continue':
        this.updateBtn('pause');
        this.hideStopButton();
        this.continue();
        break;

      case 'done':
        this.updateBtn('start');
        this.done();
        break;

      default:
        break;
    }
  }

  showStopButton() {
    this.stopBtn.classList.remove('timer__button--hide');
  }

  hideStopButton() {
    this.stopBtn.classList.add('timer__button--hide');
  }

  handleStopBtnClick() {
    this.hideStopButton();
    this.updateBtn('pause');
    this.pause();
    this.close();
  }

  updateBtn(state) {
    if (typeof state === 'string' && state.length > 0) {
      this.button.textContent =
        state[0].toLocaleUpperCase() + state.slice(1).toLocaleLowerCase();
      this.button.dataset.state = state.toLocaleLowerCase();
    }
  }

  renderTitle(text) {
    const h2 = document.createElement('h2');
    h2.className = 'timer__title';
    h2.textContent = text;
    this.header.append(h2);
  }

  renderPomodoroCounter(counter, pomodoroDone) {
    const wrapper = document.createElement('div');
    wrapper.className = 'timer__pomodoro-counter';

    for (let i = 1; i <= +counter; i++) {
      const pomodoro = document.createElement('span');
      pomodoro.className = 'timer__pomodoro-alarm';
      pomodoro.innerHTML = `
        <svg aria-hidden="true">
          <use href="img/sprite.svg#alarm"></use>
        </svg>
      `;

      if (i <= +pomodoroDone) {
        pomodoro.classList.add('timer__pomodoro-alarm--is-active');
      }

      wrapper.append(pomodoro);
    }

    this.header.append(wrapper);
  }

  render(task, startTime) {
    this.open();
    this.updateTime(startTime);

    this.header.innerHTML = '';
    this.renderTitle(task.name);
    this.renderPomodoroCounter(task.counter, task.pomodoroDone);

    this.#lastFocusedElement = document.querySelector(
      `[data-id="${task.id}"] .task__start >  .task__button`,
    );
  }

  highlightAlarm() {
    const activeAlarms = this.timer.querySelectorAll(
      '.timer__pomodoro-alarm--is-active',
    );

    if (activeAlarms.length > 0) {
      const lastActiveAlarm = activeAlarms[activeAlarms.length - 1];
      const nextAlarm = lastActiveAlarm.nextElementSibling;
      nextAlarm?.classList.add('timer__pomodoro-alarm--is-active');
      return;
    }

    const firstAlarm = this.timer.querySelector('.timer__pomodoro-alarm');
    firstAlarm.classList.add('timer__pomodoro-alarm--is-active');
  }
}
