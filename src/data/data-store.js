import ArrayUtils from '../utils/array-utils.js';

export default class DataStore {
  constructor(hostAppData) {
    this.hostAppData = hostAppData;
    this.hostIndex = this.createHostIndex(hostAppData);
  }

  /**
   * Creates an index that stores an ordered apdex list for each host
   * @param {array} hostAppData
   * @returns {objet} { hostname: [ordered apps by apdex], ... }
   */
  createHostIndex(hostAppData) {
    return hostAppData.reduce((hostIndex, appData) => {
      appData.host.forEach(host => this.addAppToHostIndex(appData, host, hostIndex));
      return hostIndex;
    }, {});
  }

  addAppToHostIndex(appData, host, hostIndex) {
    // Initialization for first app in host
    if (!hostIndex[host]) {
      hostIndex[host] = [appData];
      return;
    }

    ArrayUtils.insertInOrder(hostIndex[host], appData, 'apdex');
  }

  getTopAppsByHost(host) {
    return this.hostIndex[host].slice(0, 25);
  }

  addAppToHosts(appData) {
    appData.host.forEach(host => this.addAppToHostIndex(appData, host, this.hostIndex));
  }

  removeAppFromHosts(appData) {
    appData.host.forEach(host => {
      const apps = this.hostIndex[host];
      let index =  ArrayUtils.findOrderedInsertionIndex(apps, appData, 'apdex');
      // Check for the element in the found insertion index
      let found = apps[index].name === appData.name;
      while (!found) {
        // Check left elements
        let j = index - 1;
        while (apps[j].apdex === appData.apdex && !found) {
          if (apps[j].name === appData.name) {
            found = true;
            index = j;
          }
          j--;
        }

        // Check right elements
        let k = index;
        while (apps[k].apdex === appData.apdex && !found) {
          if (apps[k].name === appData.name) {
            found = true;
            index = k;
          }
          j++;
        }
      }
      apps.splice(index, 1);
    });
  }
}