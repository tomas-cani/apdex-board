export default class Component {
  constructor(selector = ".component") {
    this.selector = selector;
    this.defaultTemplate = `<div class="component"></div>`;
  }

  createTemplate() {
    return this.defaultTemplate;
  }

  registerEventListeners() {}

  getElement() {
    return this.parent.querySelector(this.selector);
  }

  render(parentSelector) {
    this.parent = document.querySelector(parentSelector);
    const template = this.createTemplate();
    this.parent.insertAdjacentHTML('beforeend', template);
    this.registerEventListeners();
  }
}
