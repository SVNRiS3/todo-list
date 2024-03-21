import ProjectHandler from './ProjectHandler';

const project = new ProjectHandler();

project.addProject('test project');
project.createTestTasks(0);
project.createTestTasks(1);
let projects = project.projectList;

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

  addRemoveElementListener(list, button) {
    const elementId = +button.dataset.id;
    button.addEventListener('click', () => {
      const connectedElements = document.querySelectorAll(
        `[data-id="${elementId}"]`
      );
      connectedElements.forEach((el) => (el.innerHTML = ''));
      if (list[0].type === 'project')
        projects = [
          ...projects.filter(
            (projectItem) => projectItem.getId() !== elementId
          ),
        ];
      else if (list[0].type === 'task') {
        projects = projects.map((project) => {
          project.taskList = project.taskList.filter(
            (task) => task.getId() !== elementId
          );
          return project;
        });
      }
    });
  }

  renderButtonList(list) {
    const listWrapper =
      document.querySelector(`.${list[0].type || 'default'}-list-wrapper`) ||
      this.create('div', `${list[0].type || 'default'}-list-wrapper`);
    listWrapper.innerHTML = '';
    const addNewButton = this.create(
      'button',
      `${list[0].type || 'default'}-new`,
      `Add new ${list[0].type || 'default'}`
    );
    list.forEach((item) => {
      let itemId = item.getId();
      let elWrapper = this.create(
        'div',
        `${list[0].type || 'default'}-el-wrapper`,
        '',
        itemId
      );
      let button = this.create(
        'button',
        list[0].type || 'default',
        item.title,
        itemId
      );
      this.addProjectListener(button, item);
      let removeItemEl = this.create(
        'button',
        `${list[0].type || 'default'}-remove`,
        'X',
        itemId
      );
      this.addRemoveElementListener(list, removeItemEl);
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
    this.renderButtonList(projects);
    this.renderButtonList(projects[0].taskList);
    this.renderTestList();
  }
}
