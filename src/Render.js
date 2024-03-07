import ProjectHandler from './ProjectHandler';

const project = new ProjectHandler();

export default class Render {
  init() {
    const appEl = document.createElement('div');
    appEl.classList.add('app');
    document.body.appendChild(appEl);
  }
}
