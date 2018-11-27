import expect from 'expect.js';
import Component from './component.js';

describe('Component', () => {
  let component;

  before(function () {
    this.jsdom = require('jsdom-global')();
    component = new Component();
    component.render('body');
  })
  
  after(function () {
    this.jsdom()
  })

  describe('#createTemplate()', () => {
    it('should return a non-empty string', () => {
      const template = component.createTemplate();
      expect(typeof template).to.be.equal('string');
      expect(template).not.to.be.equal('');
    });
  });

  describe('#registerEventListeners()', () => {
    it('should have a registerEventListeners function with no return value', () => {
      expect(component.registerEventListeners()).to.be.equal(undefined);
    });
  });

  describe('#getElement()', () => {
    it('should have a getElement function which returns an Element', () => {
      const element = component.getElement();
      expect(element).not.to.be.equal(undefined);
      // https://stackoverflow.com/a/36894871/5384592
      expect(element instanceof Element || element instanceof HTMLDocument).to.be.equal(true);
    });
  });

  describe('#render()', () => {
    it('should have a render function with no return value', () => {
      expect(component.render('body')).to.be.equal(undefined);
    });
  });
});
