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

  setDefaultActiveProject() {
    const activeProjects = document.querySelectorAll('.project-active');
    const renderedProjects = document.querySelectorAll('.project');
    if (activeProjects.length === 0 && renderedProjects.length > 0) {
      renderedProjects[0].classList.add('project-active');
    }
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
        this.projectEl.innerHTML = '';
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
    const listType = list.length > 0 ? list[0].type : 'task';
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
