import expect from 'expect.js';
import HostComponent from './host.component.js';

describe('HostComponent', () => {
  let hostComponent;

  before(function () {
    this.jsdom = require('jsdom-global')();
  })
  
  after(function () {
    this.jsdom()
  })

  beforeEach(() => {
    const host = {
      name: 'a',
      apps: [{ name: '1', apdex: '1' }, { name: '2', apdex: '2' }, { name: '3', apdex: '3' }],
    };
    hostComponent = new HostComponent(host);
    hostComponent.render('body');
  });

  afterEach(() => {
    const element = hostComponent.getElement();
    element.parentNode.removeChild(element);
  });

  describe('#createTemplate()', () => {
    it('should return a non-empty string', () => {
      const template = hostComponent.createTemplate();
      expect(typeof template).to.be.equal('string');
      expect(template).not.to.be.equal('');
    });
  });
});
