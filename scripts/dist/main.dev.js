"use strict";

window.addEventListener('load', function () {
  var popupBtn = document.getElementById('popup-btn');

  if (popupBtn) {
    popupBtn.addEventListener('click', function () {
      var cover = document.getElementById('cover');
      cover.classList.add('hidden');
      var popUp = document.getElementById('pop-up');
      popUp.classList.add('hidden');
    });
  }

  function popupDisapear() {
    var cover = document.getElementById('cover');
    cover.classList.add('hidden');
    var popUp = document.getElementById('pop-up');
    popUp.classList.add('hidden');
  }
});



//<tr draggable='true' ondragstart='start()' ondragover='dragover()' ></tr>
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