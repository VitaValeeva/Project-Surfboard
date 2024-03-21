function accordionTeam () {
  const workers = document.querySelectorAll(".team__item");   
  const teamAccord = document.querySelector(".team__block");

  teamAccord.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.classList.contains("team__title")) {
      let list = event.target.parentNode.parentNode;
      let items = list.children;    //workers

      let worker = event.target.parentNode;   //li
      const content = event.target.nextElementSibling;
      const contentHeight = content.firstElementChild.clientHeight;
      
      for (const iterator of workers) {
        if (iterator !== worker) {
          iterator.classList.remove("team__item-active");
          iterator.lastElementChild.style.height = 0;
        }
      }

      if (worker.classList.contains("team__item-active")) {
        worker.classList.remove("team__item-active");
        content.style.height = 0;
      } else {
        worker.classList.add("team__item-active");
        content.style.height = contentHeight + "px";
      }
    }
  });
}

accordionTeam();
