function dragnDrop(element) {

  const elWidth = element.offsetWidth + 'px'
  let shiftX;
  let shiftY;
  let dropTargetElementContainer;

  element.addEventListener('mousedown', onMouseDown);

  function onMouseDown(e) {
    shiftX = e.clientX - element.getBoundingClientRect().left;
    shiftY = e.clientY - element.getBoundingClientRect().top;

    e.target.style.width = elWidth;
    e.target.style.position = 'absolute';
    document.body.append(e.target);

    moveAt(e.pageX, e.pageY);

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);
  }

  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
    let elBelow = document.elementsFromPoint(e.clientX, e.clientY);
    const dropTargetElement = dragOver(elBelow);
    dropTargetElementContainer = dropTargetElement.querySelector('.container-content');   
  }

  function dragOver(elements) {
    const dropTargetElement = elements.find(element => element.classList.contains('container'));
    if (dropTargetElement !== undefined) {
      return dropTargetElement;
    }
  }

  function onMouseUp(e) {
    dropTargetElementContainer.insertAdjacentElement('beforeend', e.target);
    e.target.style.position = 'static';
    element.removeEventListener('mousemove', onMouseMove)
  }

  element.ondragstart = () => {
    return false;
  }
}

export default dragnDrop;