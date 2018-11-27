import expect from 'expect.js';
import DataStore from './data-store.js';

/**
 * https://stackoverflow.com/a/6274381/5384592
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

describe('DataStore', () => {
  let dataStore;

  beforeEach(() => {
    const mockHostAppData = [];
    for (let i = 1; i < 40; i++) {
      mockHostAppData.push({
        apdex: 100 - i,
        name: String(i),
        host: ['a', 'b', 'c', 'd'],
        version: '1.0',
        contributors: ['x', 'y', 'z'],
      });
    }

    dataStore = new DataStore(shuffle(mockHostAppData));
  });

  describe('#getTopAppsByHost()', () => {
    it('should return an array', () => {
      const topApps = dataStore.getTopAppsByHost('a');
      expect(topApps instanceof Array).to.be.equal(true);
    });

    it('should return app objects', () => {
      const topApps = dataStore.getTopAppsByHost('a');
      topApps.forEach(topApp => {
        expect(topApp.name).not.to.be.equal(undefined);
        expect(topApp.apdex).not.to.be.equal(undefined);
        expect(topApp.host).not.to.be.equal(undefined);
        expect(topApp.version).not.to.be.equal(undefined);
        expect(topApp.contributors).not.to.be.equal(undefined);
      });
    });

    it('should return the top 25 apps', () => {
      const topApps = dataStore.getTopAppsByHost('a');
      expect(topApps.length).to.be.equal(25);
      topApps.forEach((topApp, i) => expect(topApp.name).to.be.equal(String(i + 1)));
    });
  });

  describe('#addAppToHosts()', () => {
    it('should update the top app list for every host', () => {
      dataStore.addAppToHosts({
        apdex: 100,
        name: 'topApp',
        host: ['a', 'b', 'c', 'd'],
        version: '1.0',
        contributors: ['x', 'y', 'z'],
      });

      ['a', 'b', 'c', 'd'].forEach((host) => {
        const topApps = dataStore.getTopAppsByHost(host);
        expect(topApps.length).to.be.equal(25);
        expect(topApps[0].name).to.be.equal('topApp');
      });
    });
  });

  describe('#removeAppFromHosts()', () => {
    it('should update the top app list for every host', () => {
      let topApp = dataStore.getTopAppsByHost('a')[0];
      dataStore.removeAppFromHosts(topApp);

      ['a', 'b', 'c', 'd'].forEach((host) => {
        const topApps = dataStore.getTopAppsByHost(host);
        expect(topApps.length).to.be.equal(25);
        expect(topApps[0].name).to.be.equal('2');
      });

      topApp = dataStore.getTopAppsByHost('a')[0];
      dataStore.removeAppFromHosts(topApp);

      ['a', 'b', 'c', 'd'].forEach((host) => {
        const topApps = dataStore.getTopAppsByHost(host);
        expect(topApps.length).to.be.equal(25);
        expect(topApps[0].name).to.be.equal('3');
      });
    });
  });
});
