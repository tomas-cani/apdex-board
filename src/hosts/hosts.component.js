import Component from '../utils/component.js';
import HostComponent from '../host/host.component.js';

import './hosts.component.css';

const className = 'hosts';

export default class HostsComponent extends Component {
  constructor(hostIndex) {
    super(`.${className}`);
    this.hostIndex = hostIndex;
    this.className = className;
  }

  registerEventListeners() {
    this.getElement().addEventListener('click', (e) => {
      if (e.target.classList.contains('host-app-name')) {
        alert(e.target.getAttribute('data-release'));
      }
    });
  }

  createTemplate() {
    const hosts = Object.keys(this.hostIndex);
    const hostTemplates = hosts
      .map((host) => {
        const apps = this.hostIndex[host].slice(0, 5);
        return new HostComponent({ name: host, apps }).createTemplate();
      })
      .join('');
    return `<section class="${this.className}">${hostTemplates}</section>`;
  }

  toggleLayout() {
    this.getElement().classList.toggle('list');
  }
}
