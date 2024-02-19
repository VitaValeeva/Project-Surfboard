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