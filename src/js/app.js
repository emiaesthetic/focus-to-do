import '../index.html';
import '../scss/app.scss';

import { SettingsController } from './controllers/settingsController.js';
import { FormController } from './controllers/formController.js';

const settingsController = new SettingsController();
settingsController.init();

const formController = new FormController();
formController.init();
