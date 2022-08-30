class DragnDrop {
  constructor() {
    this.activeEl = undefined;
    this.moveEl = undefined;
    this.shift = undefined;

    this.moveAt = this.moveAt.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setCursor = this.setCursor.bind(this);
  }

  init() {
    document.querySelector('body').addEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(e) {
    if (!e.target.closest('.task')) {
      return;
    }
    if (e.target.closest('.close')) {
      return;
    }

    e.preventDefault();

    this.activeEl = e.target;
    this.shift = this.getShift(e);

    const elWidth = this.activeEl.offsetWidth;

    this.moveEl = this.activeEl.cloneNode(true);
    this.moveEl.style.width = `${elWidth}px`;
    this.moveEl.style.position = 'absolute';
    this.moveEl.addEventListener('mousemove', this.onMouseMove);

    this.setCursor('grabbing');

    document.querySelector('body').append(this.moveEl);

    this.moveAt(e);
    this.activeEl.classList.add('hidden');

    document.documentElement.addEventListener('mouseup', this.onMouseUp);
  }

  moveAt(e) {
    this.moveEl.style.left = `${e.pageX - this.shift.X - 10}px`;
    this.moveEl.style.top = `${e.pageY - this.shift.Y - 10}px`;
  }

  onMouseMove(e) {
    this.moveAt(e);
    const bellowEl = this.detectBellowElement(e);
    this.preDrop(bellowEl);
  }

  onMouseUp() {
    this.activeEl.classList.remove('hidden');
    this.moveEl.remove();
    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
  }

  getShift(e) {
    return {
      X: e.clientX - this.activeEl.getBoundingClientRect().left,
      Y: e.clientY - this.activeEl.getBoundingClientRect().top,
    };
  }

  detectBellowElement(e) {
    this.moveEl.classList.add('hidden');
    const element = document.elementFromPoint(e.pageX, e.pageY);
    this.moveEl.classList.remove('hidden');
    return element;
  }

  preDrop(target) {
    if (target.classList.contains('container-title')) {
      target.parentNode.querySelector('.container-content').prepend(this.activeEl);
    }

    if (target.classList.contains('task')) {
      target.after(this.activeEl);
    }

    if (target.classList.contains('container-add-btn')) {
      target.parentNode.querySelector('.container-content').append(this.activeEl);
    }
  }

  setCursor(cursor) {
    this.moveEl.style.cursor = cursor;
  }
}

export default DragnDrop;
