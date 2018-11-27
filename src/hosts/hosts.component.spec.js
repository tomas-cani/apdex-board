import expect from 'expect.js';
import HostsComponent from './hosts.component.js';

describe('HostsComponent', () => {
  let hostsComponent;

  before(function () {
    this.jsdom = require('jsdom-global')();
  })
  
  after(function () {
    this.jsdom()
  })

  beforeEach(() => {
    const hostIndex = {
      a: [{ name: '1', apdex: '1' }, { name: '2', apdex: '2' }, { name: '3', apdex: '3' }],
      b: [{ name: '1', apdex: '1' }, { name: '2', apdex: '2' }, { name: '3', apdex: '3' }],
    };
    hostsComponent = new HostsComponent(hostIndex);
    hostsComponent.render('body');
  });

  afterEach(() => {
    const element = hostsComponent.getElement();
    element.parentNode.removeChild(element);
  });

  describe('#registerEventListeners()', () => {
    it('should have a registerEventListeners function with no return value', () => {
      expect(hostsComponent.registerEventListeners()).to.be.equal(undefined);
    });
  });

  describe('#createTemplate()', () => {
    it('should return a non-empty string', () => {
      const template = hostsComponent.createTemplate();
      expect(typeof template).to.be.equal('string');
      expect(template).not.to.be.equal('');
    });
  });

  describe('#toggleLayout()', () => {
    it('should have a toggleLayout function with no return value', () => {
      expect(typeof hostsComponent.toggleLayout).to.be.equal('function');
      expect(hostsComponent.toggleLayout()).to.be.equal(undefined);
    });

    it('should change the class name', () => {
      hostsComponent.toggleLayout();
      expect(hostsComponent.getElement().classList.contains('list')).to.be.equal(true);

      hostsComponent.toggleLayout();
      expect(hostsComponent.getElement().classList.contains('list')).to.be.equal(false);
    });
  });
});
