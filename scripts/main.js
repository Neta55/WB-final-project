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

