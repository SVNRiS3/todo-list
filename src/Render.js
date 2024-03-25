import ProjectHandler from './ProjectHandler';
const project = new ProjectHandler();

project.addProject('test project');
project.createTestTasks(0);
project.createTestTasks(1);
let projects = project.projectList;

export default class Render {
  constructor() {
    this.appEl = this.create('div', 'app');
    this.projectEl = this.create('div', 'project-list');
    this.taskEl = this.create('div', 'task-list');
    this.projectName = this.create('h1');

    document.body.appendChild(this.projectName);
    document.body.appendChild(this.appEl);
    document.body.appendChild(this.projectEl);
    document.body.appendChild(this.taskEl);
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
    //TODO
    console.log('edit task');
  }

  removeActiveClass(type) {
    document
      .querySelectorAll(`.${type}-active`)
      .forEach((el) => el.classList.remove(`${type}-active`));
    if (type === 'project') projects.forEach((project) => (project.active = 0));
    else if (type === 'task')
      projects.forEach((project) =>
        project.taskList.forEach((task) => (task.active = 0))
      );
  }

  addActiveClass(element, item) {
    element.classList.add(`${item.type}-active`);
    item.active = 1;
  }

  addProjectListener(element, item) {
    element.addEventListener('click', () => {
      this.removeActiveClass(item.type);
      this.addActiveClass(element, item);
      if (item.type === 'project') this.renderProjectTasks(item);
      else this.renderTaskEdit(item);
    });
  }

  setDefaultActiveProject() {
    let activeProjects = projects.filter((project) => project.active === 1);
    const renderedProjects = document.querySelectorAll('.project');
    if (activeProjects.length === 0 && renderedProjects.length > 0) {
      this.addActiveClass(renderedProjects[0], projects[0]);
    }
    let activeClassProjects = document.querySelectorAll('.project-active');
    this.projectName.textContent = activeClassProjects[0]
      ? activeClassProjects[0].textContent
      : 'Create your first project.';
  }

  addRemoveElementListener(type, button) {
    button.addEventListener('click', () => {
      const elementId = +button.dataset.id;
      if (type === 'project')
        projects.splice(
          0,
          projects.length,
          ...projects.filter((projectItem) => projectItem.getId() !== elementId)
        );
      else if (type === 'task') {
        projects.splice(
          0,
          projects.length,
          ...projects.map((project) => {
            project.taskList = project.taskList.filter(
              (task) => task.getId() !== elementId
            );
            return project;
          })
        );
      }
      this.renderButtonList(projects);
      if (projects.length > 0) {
        this.renderButtonList(projects[0].taskList);
      } else {
        this.taskEl.innerHTML = '';
      }
    });
  }

  addAddElementListener(button, type) {
    button.addEventListener('click', () => {
      let title = '';
      while (title === '') {
        title = prompt(
          `${type[0].toUpperCase() + type.slice(1, type.length)} name: `
        );
      }
      if (title === null) return;
      if (type === 'project') {
        project.addProject(title);
        this.renderButtonList(projects);
      } else if (type === 'task') {
        const activeProjectId =
          +document.querySelector('.project-active').dataset.id;
        const activeProject = projects.filter(
          (project) => project.getId() === activeProjectId
        )[0];
        activeProject.addTask(title);
        this.renderButtonList(activeProject.taskList);
      }
    });
  }

  renderButtonList(list) {
    let listType = '';
    if (list.length > 0) listType = list[0].type;
    else if (projects.length === 0) listType = 'project';
    else listType = 'task';
    const listWrapper = listType === 'project' ? this.projectEl : this.taskEl;
    listWrapper.innerHTML = '';
    const addNewButton = this.create(
      'button',
      `${listType}-new`,
      `Add new ${listType}`
    );
    this.addAddElementListener(addNewButton, listType);
    list.forEach((item) => {
      let itemId = item.getId();
      let elWrapper = this.create('div', `${listType}-el-wrapper`, '', itemId);
      let button = this.create('button', listType, item.title, itemId);
      if (item.active === 1) this.addActiveClass(button, item);
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
    this.setDefaultActiveProject();
  }

  init() {
    this.renderButtonList(projects);
    this.renderButtonList(projects[0].taskList);
  }
}
