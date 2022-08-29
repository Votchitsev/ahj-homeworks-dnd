class DragnDrop {
  constructor() {
    this.activeEl = undefined;
    this.moveEl = undefined;
    this.shift = undefined;

    this.moveAt = this.moveAt.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  init() {
    document.querySelector('body').addEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(e) {
    if (!e.target.closest('.task')) {
      return;
    }

    e.preventDefault();

    this.activeEl = e.target;
    this.shift = this.getShift(e);

    const elWidth = this.activeEl.offsetWidth;

    this.moveEl = this.activeEl.cloneNode(true);
    this.moveEl.style.width = `${elWidth}px`;
    this.moveEl.style.position = 'absolute';

    document.querySelector('body').append(this.moveEl);

    this.moveAt(e);
    this.activeEl.classList.add('hidden');

    this.moveEl.addEventListener('mousemove', this.onMouseMove);
  }

  moveAt(e) {
    this.moveEl.style.left = `${e.pageX - this.shift.X - 10}px`;
    this.moveEl.style.top = `${e.pageY - this.shift.Y - 10}px`;
  }

  onMouseMove(e) {
    this.moveAt(e);
  }

  onMouseUp() {

  }

  getShift(e) {
    return {
      X: e.clientX - this.activeEl.getBoundingClientRect().left,
      Y: e.clientY - this.activeEl.getBoundingClientRect().top,
    }
  }
}

export default DragnDrop;
