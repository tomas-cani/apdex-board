import DataStore from '../data/data-store.js';
import HeaderComponent from '../header/header.component.js';
import HostsComponent from '../hosts/hosts.component.js';

import './app.component.css';

export default class App {
  constructor(hostAppData = []) {
    this.dataStore = new DataStore(hostAppData);
    this.hostsComponent = new HostsComponent(this.dataStore.hostIndex);
    this.headerComponent = new HeaderComponent();

    this.changeLayout = this.changeLayout.bind(this);
  }

  render() {
    this.headerComponent.render('.app');
    this.headerComponent.onLayoutChange(this.changeLayout);

    this.hostsComponent.render('.app');
  }

  changeLayout() {
    this.hostsComponent.toggleLayout();
  }
}
