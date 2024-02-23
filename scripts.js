//overlay

const burger  = document.querySelector('#burger');
const overlay = document.querySelector('#overlay');
const body = document.querySelector('body');

let links = document.querySelectorAll('.menu__link'); [1,2,3,4,5,6]

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(e){
  e.preventDefault();
  burger.classList.toggle('burger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}

burger.addEventListener('click', toggleMenu);

//switcher

const findBlockByAlias = (alias) => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") == alias
  });
};

$(".reviews-switcher__link").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".reviews-switcher__item");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});

//acco

function accordionTeam () {
  const workers = document.querySelectorAll(".team__item");
  const teamAccord = document.querySelector(".team");

  teamAccord.addEventListener("click", function (event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains("team__title")) {
      const worker = target.parentNode;
      const content = target.nextElementSiblbng;
      const contentHeight = content.firstElementChild.clientHeight;

      for (const iterator of workers) {
        if (iterator != worker) {
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
