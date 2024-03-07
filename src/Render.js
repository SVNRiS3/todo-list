import ProjectHandler from './ProjectHandler';

const project = new ProjectHandler();

project.addProject('test project');
project.createTestTasks(0);
project.createTestTasks(1);
const projects = project.projectList;

export default class Render {
  constructor() {
    this.appEl = this.create('div');
    this.appEl.classList.add('app');
    document.body.appendChild(this.appEl);
  }

  create(element, className = '', text = '', data = '') {
    const el = document.createElement(element);
    className && el.classList.add(className);
    text && (el.textContent = text);
    data && el.setAttribute('data-id', data);
    return el;
  }

  renderButtonList(list, type) {
    const listWrapper = this.create('div', `${type}-list-wrapper`);
    const addNewButton = this.create(
      'button',
      `${type}-new`,
      `Add new ${type}`
    );
    list.forEach((item) => {
      let itemId = item.getId();
      let elWrapper = this.create('div', `${type}-el-wrapper`, '', itemId);
      let button = this.create('button', type, item.title, itemId);
      let deleteItemEl = this.create('button', `${type}-delete`, 'X', itemId);
      elWrapper.appendChild(button);
      elWrapper.appendChild(deleteItemEl);
      listWrapper.appendChild(elWrapper);
    });
    listWrapper.appendChild(addNewButton);
    this.appEl.appendChild(listWrapper);
  }

  renderTestList() {
    project.projectList[0].taskList.forEach((task) => console.log(task.title));
    project.projectList[1].taskList.forEach((task) => console.log(task.title));
  }

  init() {
    this.renderButtonList(projects, 'project');
    this.renderTestList();
  }
}
