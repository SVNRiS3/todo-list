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

  renderProjectTasks(item) {
    this.renderButtonList(item.taskList, 'task');
  }

  renderTaskEdit() {
    console.log('edit task');
  }

  addProjectListener(element, item) {
    element.addEventListener('click', () => {
      element.classList.add(`${item.type}-active`);
      if (item.type === 'project') this.renderProjectTasks(item);
      else this.renderTaskEdit(item);
    });
  }

  addRemoveElementListener(item, button) {
    button.addEventListener('click', () => {
      document
        .querySelectorAll(`[data-id="${button.dataset.id}"]`)
        .forEach((el) => (el.innerHTML = ''));
      if (item.type === 'task') {
        //do sth
      } else if (item.type === 'project') {
        //do sth else
      }
    });
  }

  renderButtonList(list, type) {
    const listWrapper =
      document.querySelector(`.${type}-list-wrapper`) ||
      this.create('div', `${type}-list-wrapper`);
    listWrapper.innerHTML = '';
    const addNewButton = this.create(
      'button',
      `${type}-new`,
      `Add new ${type}`
    );
    list.forEach((item) => {
      let itemId = item.getId();
      let elWrapper = this.create('div', `${type}-el-wrapper`, '', itemId);
      let button = this.create('button', type, item.title, itemId);
      this.addProjectListener(button, item);
      let removeItemEl = this.create('button', `${type}-remove`, 'X', itemId);
      addRemoveElementListener(item, removeItemEl);
      elWrapper.appendChild(button);
      elWrapper.appendChild(removeItemEl);
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
    this.renderButtonList(projects[0].taskList, 'task');
    this.renderTestList();
  }
}
