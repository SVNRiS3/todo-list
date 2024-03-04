import { compareAsc } from 'date-fns';
import Task from './Task';
export default class Project {
  #id = Date.now();
  taskList = [];

  constructor(title) {
    this.title = title;
  }

  getId() {
    return this.#id;
  }

  getTaskById(taskId) {
    return this.taskList.filter((task) => task.getId() === taskId)[0];
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

  addTask(taskName) {
    const newTask = new Task(taskName);
    this.taskList.push(newTask);
    this.sortTasks();
  }

  removeTask(taskToRemoveId) {
    const taskToRemove = this.getTaskById(taskToRemoveId);
    this.taskList = this.taskList.filter(
      (task) => task.getId() !== taskToRemove.getId()
    );
  }
}
