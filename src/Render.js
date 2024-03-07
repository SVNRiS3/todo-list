import ProjectHandler from './ProjectHandler';

const project = new ProjectHandler();

project.createTestTasks();

export default class Render {
  static init() {
    const appEl = document.createElement('div');
    appEl.classList.add('app');
    document.body.appendChild(appEl);
    project.projectList[0].taskList.forEach((task) => console.log(task.title));
  }
}
