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


//switcher reviews-section

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


//acco team-section

function accordionTeam () {
  const workers = document.querySelectorAll(".team__item");    //не надо???
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


// slider products-section

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


//modal order-section

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

      success: data => {
        console.log(data);
      }

    });

    request.done((data) => {
      content.text(data.message);          
    });

    request.fail(() => {
      const message = "Ошибка сервера";
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


// acco products-menu-section

const mesureWidth = item => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 524;
  }  

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = (container) => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");
  content.width(0);
};

const openItem = item => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products-menu__container");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products-menu");

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openItem(item);
  } 
});

$(".products-menu__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($('.products-menu'));
});


//ops

const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

// const mobileDetect = new MobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано неверное значение в countSectionPosition");
    return 0;
  }

  return position;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed";

  if (menuTheme === "black") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const PerformTransition = (sectionEq) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;
  
  inScroll = true;   
        
  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClassForItem(sections, sectionEq, "active");

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
      
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        PerformTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        PerformTransition(prevSection.index());
      }
    },
  } ;
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", e => {   //управление с клавиатуры
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38: //prev
        scroller.prev();
        break;
  
      case 40: //next
        scroller.next();
        break;  
    }   
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {   //навигация по ссылкам
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  PerformTransition(reqSection.index());
});

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  //свайп моб.версия 
  $("body").swipe({             
    swipe: function(event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}


//video

let video;
let durationControl;
let soundControl;
let intervalId;

document.addEventListener('DOMContentLoaded', e=>{
    video = document.getElementById('video');

    // вешаем обработчик события на тег video
    video.addEventListener('click', playStop);

    // находим все кнопки play и навешиваем через цикл на каждую обработчик
    let playButtons = document.querySelectorAll('.play');
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    // обработчик событий на кнопку динамик
    let micControl = document.getElementById('micLevel');
    micControl.addEventListener('click' , soundOf);

    // обработчики события для ползунка продолжительности видео
    durationControl = document.getElementById('durationLevel');
    durationControl.addEventListener('mousedown' , stopInterval);
    durationControl.addEventListener('click', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    // обработчики события для ползунка громоксти
    soundControl = document.getElementById('volumeLevel');
    soundControl.addEventListener('click' , changeSoundVolume);
    soundControl.addEventListener('mouseup' , changeSoundVolume);

    // задаем максимальное и минимальное значение volume
    soundControl.min = 0;
    soundControl.max = 10;

    soundControl.value = soundControl.max;

})

function playStop(){
    // находим кнопку с картинкой PLAY и показываем или скрываем ее
    let playImg = document.querySelector('.video__play');
    playImg.classList.toggle('video__play--active');

    // присваиваем ползунку продолжительности видео максимальное значение 
    // равное продолжительности нашего видео
    durationControl.max = video.duration;

    // проверяем стоит ли видео на паузе, если да - то продолжаем воспроизведение
    if (video.paused) {
        // запускаем видео
        video.play();
        // обновляем ползунок каждые 15 милисекунд функцией updateDuration
        intervalId = setInterval(updateDuration , 1000 /66);
    } else { 
        // понимаем что видео не стоит на паузе,и ставим его на паузу
        video.pause();
        clearInterval(intervalId);
    }
}

// обновление позиции ползунка продолжительности видео
function updateDuration(){
    durationControl.value = video.currentTime;
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

// реализация возможности перемотки видео
function setVideoDuration(){
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    video.currentTime = durationControl.value;
    // обновление ползунка каждые 15 милисекунд функцией updateDuration
    intervalId = setInterval(updateDuration , 1000 /66);
}

// управление звуком видео
function changeSoundVolume(){
    // свойство video.volume может иметь значени от 0 до 1 
    // поэтому делим все на 10 , что бы более четко контролировать значение

    video.volume = soundControl.value / 10;
}

function soundOf(){
    // делаем проверку уровня громкости 
    // если у нашего видео есть звук , то мы его выключаем 
    // предварительно запомнив текущую позицию громкости в переменную soundLevel

    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}


//map
  

let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.755864, 37.617698],
   zoom: 11,
   controls: [],
 });
 
 let coords = [
     [55.748990, 37.609955],
     [55.766157, 37.634739],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker.svg',
     iconImageSize: [58, 73],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);




//2-й вариант - работает только при подключении в HEAD

// function init() {
//     var myMap = new ymaps.Map("map", {
//     center: [55.755864, 37.617698],
//     zoom: 11,
//     controls: []
//   });
// };

// ymaps.ready(init);

