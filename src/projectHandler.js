import Task from './Task';
import Project from './Project';

export default class taskHandler {
  mainProject = new Project('Main');
  projectList = [mainProject];

  addProject(projectName) {
    if (this.projectList.map((project) => project.title).includes(projectName))
      return 'Project name already in use!';
    const projectToAdd = new Project(projectName);
    this.projectList.push(projectToAdd);
  }

  removeProject(projectName) {
    this.projectList = this.projectList.filter(
      (task) => task.getId() !== taskToRemove.getId()
    );
  }
}
