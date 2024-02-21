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

$(".reviews-switcher__link").click((event) => {
  event.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".reviews-switcher__item");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});