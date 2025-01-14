import { Settings } from '../models/settings.js';
import { SettingsView } from '../views/settingsView.js';

export class SettingsController {
  constructor() {
    this.model = new Settings();
    this.view = new SettingsView();

    this.view.bindUpdate(this.update.bind(this));
  }

  update(newSettings) {
    this.model.update(newSettings);
  }

  init() {
    this.view.render(this.model);
  }
}
