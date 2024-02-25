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
      const content = target.nextElementSibling;
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

//products-slider

let list = document.querySelector(".products__list");
let controls = document.querySelector(".arrow");
let currentIndex = 0;

const slider = (event) => {
  event.preventDefault();
  let target = event.target;

  if (target.classList.contains("arrow__link")) {
    let targetValue = target.dataset.vector;

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
};

function doTransition(index) {
  list.style.transform = `translateX(-${index * 100}%)`;
}

controls.addEventListener("click", slider);

//modal

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$(".form").submit ((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");
  
  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {    
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },

      // error: (data) => {}
    });

    request.done((data) => {
      content.text(data.message);          
    });

    request.fail((data) => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline",
      });
    })
  }  
});

$(".app-submit-btn").click((e) => {
  e.preventDefault();

  $.fancybox.close();
});
