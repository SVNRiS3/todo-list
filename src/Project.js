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
    this.taskList.sort((a, b) => a.getPriority() - b.getPriority());
  }

  addTask(task) {
    this.taskList.push(task);
    this.sortTasks();
  }

  removeTask(taskToRemove) {
    this.taskList = this.taskList.filter(
      (task) => task.getId() !== taskToRemove.getId()
    );
  }
}
