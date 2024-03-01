export default class Task {
  id;
  #creationDate = new Date();
  #isCompleted = false;
  location;
  priority;
  dueDate;
  description;
  tags;
  notes;

  constructor(title) {
    this.title = title;
  }

  triggerCompletion() {
    this.#isCompleted = !this.#isCompleted;
  }

  getCreationDate() {
    return this.#creationDate;
  }
}
