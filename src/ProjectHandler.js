import Project from './Project';

export default class ProjectHandler {
  static moveTask(projectToMoveFromId, taskToMoveId, projectToMoveToId) {
    const projectToMoveFrom = getProjectById(projectToMoveFromId);
    const taskToMove = projectToMoveFrom.getTaskById(taskToMoveId);
    const projectToMoveTo = getProjectById(projectToMoveToId);
    projectToMoveTo.addTask(taskToMove);
    projectToMoveFrom.removeTask(taskToMove);
  }

  mainProject = new Project('Main');
  projectList = [this.mainProject];
  //add example tasks
  createTestTasks() {
    this.projectList[0].addTask('example task 1');
    this.projectList[0].addTask('example task 2');
    this.projectList[0].addTask('example task 3');
  }

  addProject(projectName) {
    if (this.projectList.map((project) => project.title).includes(projectName))
      return 'Project name already in use!';
    const projectToAdd = new Project(projectName);
    this.projectList.push(projectToAdd);
  }

  removeProject(projectToRemoveId) {
    this.projectList = this.projectList.filter(
      (project) => project.getId() !== projectToRemoveId
    );
  }

  getProjectById(projectId) {
    return this.projectList.filter(
      (project) => project.getId() === projectId
    )[0];
  }
}
