import { compareAsc } from 'date-fns';

export default class Project {
  taskList = [];

  constructor(title) {
    this.title = title;
  }

  sortTasks() {
    this.taskList.sort((a, b) =>
      compareAsc(
        a.dueDate || a.getCreationDate(),
        b.dueDate || b.getCreationDate()
      )
    );
  }

  addTask(task, mainProject = null) {
    this.taskList.push(task);
    if (mainProject) {
      mainProject.taskList.push(task);
      mainProject.sortTasks();
    }
  }

  removeTask(taskToRemove, projectList = null) {
    projectList
      ? projectList.map((project) => {
          project.taskList = project.taskList.filter(
            (task) => task.getId() !== taskToRemove.getId()
          );
          return project;
        })
      : (this.taskList = this.taskList.filter(
          (task) => task.getId() !== taskToRemove.getId()
        ));
  }
}
