import expect from 'expect.js';
import HeaderComponent from './header.component.js';

describe('HeaderComponent', () => {
  let headerComponent;

  before(function () {
    this.jsdom = require('jsdom-global')();
  })
  
  after(function () {
    this.jsdom()
  })

  beforeEach(() => {
    headerComponent = new HeaderComponent();
    headerComponent.render('body');
  });

  afterEach(() => {
    const element = headerComponent.getElement();
    element.parentNode.removeChild(element);
  });

  describe('#onLayoutChange()', () => {
    it('should have an onLayoutChange function with no return value', () => {
      expect(headerComponent.onLayoutChange()).to.be.equal(undefined);
    });

    it('should add a callback to the listeners array', () => {
      headerComponent.onLayoutChange(() => {});
      expect(headerComponent.layoutChangeCallbacks.length).to.be.equal(1);
    });
  });

  describe('#registerEventListeners()', () => {
    it('should have a registerEventListeners function with no return value', () => {
      expect(headerComponent.registerEventListeners()).to.be.equal(undefined);
    });
  });

  describe('#createTemplate()', () => {
    it('should return a non-empty string', () => {
      const template = headerComponent.createTemplate();
      expect(typeof template).to.be.equal('string');
      expect(template).not.to.be.equal('');
    });
  });
});
