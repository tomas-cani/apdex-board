import Component from '../utils/component.js';

import './header.component.css';

const classname = 'header';

export default class HeaderComponent extends Component {
  constructor() {
    super();
    this.layoutChangeCallbacks = [];
    this.email = 'averylongemailadress@companyname.com';
    this.selector = `.${classname}`;
  }

  onLayoutChange(callback) {
    if (callback) {
      this.layoutChangeCallbacks.push(callback);
    }
  }

  registerEventListeners() {
    this.parent.querySelector('.layout-toggle').addEventListener('change', (e) => {
      const label = document.querySelector('.layout-toggle-label');
      if (e.target.checked) {
        label.textContent = 'Show as an awesome grid';
      } else {
        label.textContent = 'Show as list';
      }
      this.layoutChangeCallbacks.forEach(callback => callback(e.target.checked));
    });
  }

  createTemplate() {
    return `
      <header class="${classname}">
        <h1 class="app-title">Apps by Host</h1>
        <span class="email" title="${this.email}">
          for user ${this.email}
        </span>
        <div class="layout-toggle-container">
          <input type="checkbox" name="layout-toggle" class="layout-toggle" value="true">
          <label class="layout-toggle-label" for="layout-toggle">Show as list</label>
        </div>
      </header>
    `;
  }
}
