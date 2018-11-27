import Component from '../utils/component.js';

import './host.component.css';

export default class HostComponent extends Component {
  constructor(host) {
    super();
    this.host = host;
    this.selector = `#${host.name}`;
  }

  createTemplate() {
    const appTemplates = this.host.apps
      .map(app => `
        <li class="host-app">
          <div class="apdex">${app.apdex}</div>
          <div class="host-app-name" data-release=${app.version}>${app.name}<div>
        </li>
      `)
      .join('');

    return `
      <article id="${this.host.name}" class="host">
        <h2 class="host-name">${this.host.name}</h2>
        <ul class="host-apps">
          ${appTemplates}
        </ul>
      </article>
    `;
  }
};