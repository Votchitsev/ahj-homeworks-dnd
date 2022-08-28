function dragnDrop (element) {
  element.addEventListener('dragstart', (e) => {
    e.target.classList.add('selected');
  });

  element.addEventListener('dragend', (e) => {
    e.target.classList.remove('selected');
  });

  element.addEventListener('drag', (e) => {
    // e.preventDefault();
    const movedEl = document.querySelector('.selected');
    const currentPoint = document.elementsFromPoint(e.pageX, e.pageY)
    
    const container = currentPoint.find((element) => element.classList.contains('container'))
    
    if (container === undefined) {
      return;
    }

    const contentContainer = container.querySelector('.container-content');
    contentContainer.insertAdjacentElement('beforeend', movedEl);
  })
}

export default dragnDrop;
