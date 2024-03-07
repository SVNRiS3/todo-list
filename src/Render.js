import ProjectHandler from './ProjectHandler';

const project = new ProjectHandler();

project.createTestTasks();
const projects = project.projectList;

export default class Render {
  constructor() {
    this.appEl = this.create('div');
    this.appEl.classList.add('app');
    document.body.appendChild(this.appEl);
  }

  create(element, className = '', data = '') {
    const el = document.createElement(element);
    className && el.classList.add(className);
    data && el.setAttribute('data-id', data);
    return el;
  }

  renderButtonList(list, type) {
    const wrapper = this.create('div', `${type}-wrapper`);
    list.forEach((item) => {
      let button = this.create('button', type, item.getId());
      wrapper.appendChild(button);
    });
    this.appEl.appendChild(wrapper);
  }

  renderTestList() {
    project.projectList[0].taskList.forEach((task) => console.log(task.title));
  }

  init() {
    this.renderButtonList(projects, 'project');
    this.renderTestList();
  }
}
