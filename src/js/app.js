import '../index.html';
import '../scss/app.scss';

import { SettingsController } from './controllers/settingsController.js';

const settingsController = new SettingsController();
settingsController.init();
