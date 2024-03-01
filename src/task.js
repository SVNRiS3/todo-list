export default class Task {
  #createDate = new Date();
  #isCompleted = false;
  priority;
  dueDate;
  description;
  tags;
  notes;

  constructor(title) {
    this.title = title;
  }

  triggerCompletion() {
    this.isCompleted = this.isCompleted ? true : false;
  }

  get createDate() {
    return this.createDate;
  }
}
