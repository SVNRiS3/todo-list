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
      document
        .querySelectorAll(`.${item.type}-active`)
        .forEach((el) => el.classList.remove(`${item.type}-active`));
      element.classList.add(`${item.type}-active`);
      if (item.type === 'project') this.renderProjectTasks(item);
      else this.renderTaskEdit(item);
    });
  }

  addRemoveElementListener(type, button) {
    const elementId = +button.dataset.id;
    button.addEventListener('click', () => {
      const connectedElements = document.querySelectorAll(
        `[data-id="${elementId}"]`
      );
      connectedElements.forEach((el) => (el.innerHTML = ''));
      if (type === 'project')
        projects = [
          ...projects.filter(
            (projectItem) => projectItem.getId() !== elementId
          ),
        ];
      else if (type === 'task') {
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
    const listType = list[0].type || 'default';
    const listWrapper =
      document.querySelector(`.${listType}-list-wrapper`) ||
      this.create('div', `${listType}-list-wrapper`);
    listWrapper.innerHTML = '';
    const addNewButton = this.create(
      'button',
      `${listType}-new`,
      `Add new ${listType}`
    );
    // this.addAddElementListener(listType);
    list.forEach((item) => {
      let itemId = item.getId();
      let elWrapper = this.create('div', `${listType}-el-wrapper`, '', itemId);
      let button = this.create('button', listType, item.title, itemId);
      this.addProjectListener(button, item);
      let removeItemEl = this.create(
        'button',
        `${listType}-remove`,
        'X',
        itemId
      );
      this.addRemoveElementListener(listType, removeItemEl);
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
