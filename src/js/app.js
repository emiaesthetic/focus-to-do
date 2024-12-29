import '../index.html';
import '../scss/app.scss';
import './utils/choices.js';
import './utils/animation.js';

import { SettingsController } from './controllers/settingsController.js';
import { FormController } from './controllers/formController.js';

const settingsController = new SettingsController();
settingsController.init();

const formController = new FormController();
formController.init();
