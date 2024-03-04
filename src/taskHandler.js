import Task from './Task';
import Project from './Project';

export default class taskHandler {
  mainProject = new Project('Main');
  projectList = [mainProject];

  constructor() {
    //todo
  }

  addProject(name) {
    const projectToAdd = new Project(name);
    this.projectList.push(projectToAdd);
  }
}
