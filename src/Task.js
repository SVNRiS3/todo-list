import { format } from 'date-fns';

export default class Task {
  #id = Date.now();
  #creationDate = format(new Date(), 'dd/MM/yyyy');
  #isCompleted = false;
  priority;
  dueDate = null;
  description;
  tags = [];
  notes;

  constructor(title) {
    this.title = title;
  }

  getId() {
    return this.#id;
  }

  triggerCompletion() {
    this.#isCompleted = !this.#isCompleted;
  }

  getCreationDate() {
    return this.#creationDate;
  }

  setDueDate(date) {
    this.dueDate = format(date, 'dd/MM/yyyy');
  }

  removeDueDate() {
    this.dueDate = null;
  }

  setPriority(priority) {
    if (priority >= 0 && priority <= 2) this.priority = priority;
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  removeTag(tag) {
    this.tags = this.tags.filter((tagsTag) => tagsTag !== tag);
  }
}
