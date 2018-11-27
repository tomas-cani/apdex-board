import App from './app/app.component.js';
import hostAppData from './data/host-app-data.js';

import './main.css';

const app = new App(hostAppData);
app.render();
