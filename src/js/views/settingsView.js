export class SettingsView {
  constructor() {
    this.form = document.querySelector('.settings');
    this.overlay = this.form.closest('.overlay');
    this.openBtn = document.querySelector('.app__settings-button');
    this.closeBtn = this.form.querySelector('.settings__close-button');

    this.openBtn.addEventListener('click', this.open.bind(this));
    this.closeBtn.addEventListener('click', this.close.bind(this));
    this.form.addEventListener('submit', this.submit.bind(this));
  }

  bindUpdate(handler) {
    this.update = handler;
  }

  open() {
    this.overlay.classList.add('overlay--open');
  }

  close() {
    this.overlay.classList.remove('overlay--open');
  }

  submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newSettings = Object.fromEntries(formData);
    this.update(newSettings);
    this.close();
  }

  render(settingsData) {
    this.form.taskDuration.value = settingsData.taskDuration;
    this.form.shortBreak.value = settingsData.shortBreak;
    this.form.longBreak.value = settingsData.longBreak;
    this.form.longBreakAfter.value = settingsData.longBreakAfter;
  }
}
