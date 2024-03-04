import { compareAsc } from 'date-fns';

export default class Project {
  taskList = [];
  constructor(title) {
    this.title = title;
  }

  addTask(task) {
    this.taskList.push(task);
  }

  removeTask(taskToRemoveId) {
    this.taskList = this.taskList.filter(
      (task) => task.getId() !== taskToRemoveId
    );
  }

  sortTasks() {
    this.taskList.sort((a, b) =>
      compareAsc(
        a.dueDate || a.getCreationDate(),
        b.dueDate || b.getCreationDate()
      )
    );
  }
}
