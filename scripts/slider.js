(function () {

  let list = document.querySelector(".products__list");
  let controls = document.querySelectorAll(".arrow .arrow__link");
  let currentIndex = 0;
  
  controls.forEach(function (elem) {
    elem.addEventListener("click", slider);
  });
  
  function slider (event) {
    event.preventDefault();
  
    let targetValue = event.currentTarget.dataset.vector;
  
    if (targetValue === "next") {
      if (currentIndex < list.children.length - 1) {
        currentIndex += 1;
        doTransition(currentIndex);
      } else return;
    }
  
    if (targetValue === "prev") {
      if (currentIndex > 0) {
        currentIndex -= 1;
        doTransition(currentIndex);
      } else return;
    }
  }
  
  function doTransition(index) {
    list.style.transform = `translateX(-${index * 100}%)`;
  }
  })();