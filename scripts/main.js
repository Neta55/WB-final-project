window.addEventListener('load', function () {

  const popupBtn = document.getElementById('popup-btn')
  if (popupBtn) {
    popupBtn.addEventListener('click', function () {
      const cover = document.getElementById('cover');
      cover.classList.add('hidden');
      const popUp = document.getElementById('pop-up');
      popUp.classList.add('hidden');

    })
  }

  function popupDisapear() {
    const cover = document.getElementById('cover')
    cover.classList.add('hidden')
    const popUp = document.getElementById('pop-up')
    popUp.classList.add('hidden')
  }
})

// let row;
// function start() {
//   row = event.target;
// }
// function dragover() {
//   var e = event;
//   e.preventDefault();

//   let children = Array.from(e.target.parentNode.parentNode.children);
//   console.log(children);
//   if (children.indexOf(e.target.parentNode) > children.indexOf(row))
//     e.target.parentNode.after(row);

//   else
//     e.target.parentNode.before(row);
// }
