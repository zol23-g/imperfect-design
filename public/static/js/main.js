(function() {
"use strict";

/*------------------------------------------------------------------

  01. Custom easings

-------------------------------------------------------------------*/

// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: false
});

window.App = {};

App.config = {
  headroom: {
    enabled: true,
    options: {
      classes : {
        initial : "headroom",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      },
    }
  },
  ajax: {
    enabled: true,
  },
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

window.onload = function () {
  customEasingsInit();
  pageRevealEffects();
  Preloader.init();
  

  document.fonts.ready.then(function () {
    initComponents();

    initialReveal(() => {
      MainSliderReveal.animate();
      MainSliderReveal2.animate();
      MainSliderReveal3.animate();
      MainSliderReveal4.animate();
      MainSliderReveal5.animate();
      MainSliderReveal9.animate();
      MainSliderRevealAll.animate();
    });
  });
}


// Reloads all scripts when navigating through pages
function initComponents() {
  lazyLoading();
  SectionSlider();
  Header.init();

  MainSlider.init();
  MainSlider2.init();
  MainSlider3.init();
  MainSlider4.init();
  MainSlider5.init();
  MainSlider9.init();
  MainSliderAll.init();

  Cursor.init();
  splitTextIntoLines();
  parallaxInit();
  sidebar();
  searchbar();
  mobileMenu();
  Accordion.init();
  Tabs.init();
  feather.replace();

  masonryFilterInit();
  masonryGridInit();

  mapInit();
  backButton();
  comingSoon();
  pinOnScroll();
  galleryInit();
  inputCounter();

  Header.headerSticky();
  PJAX.init();
  customSelect();
  someSlider();
  contactForm();

  //
	// your custom plugins init here
  //
}


function someSlider() {
  const slider = document.querySelector('.js-shop-slider .js-slider-slider');

  const sliderInstance = new Swiper(slider, {
    spaceBetween: 0,
    speed: 1000,
    parallax: true,
    lazy: {
      loadPrevNext: true,
    },
    breakpoints: {
      575: {
        parallax: false,
      },
    },
  });

  const sliderPaginationItems = document.querySelectorAll('.js-shop-slider .js-slider-pagination > *');

  sliderInstance.on('slideChangeTransitionStart', function () {
    sliderPaginationItems[sliderInstance.activeIndex].classList.add('is-active');
  });

  for (let i = 0; i < sliderPaginationItems.length; i++) {
    const el = sliderPaginationItems[i];
    
    el.addEventListener('click', (e) => {
      sliderInstance.slideTo(i)
    })
  }
}

function customSelect() {
  const target = document.querySelectorAll(".js-selectize");
  if (!target) return;
  target.forEach(function(select) {
    NiceSelect.bind(select);
  });

  const target2 = document.querySelectorAll(".js-selectize-seachable");
  if (!target2) return;
  target2.forEach(function(select) {
    NiceSelect.bind(select, { searchable: true });
  });
}

function inputCounter() {
  const target = document.querySelector('.js-input-counter');
  if (!target) return;

  const input = target.querySelector('input')
  var value = input.value;

  target.querySelector('.js-up').addEventListener('click', () => {
    input.focus();
    value = parseInt(value) + 1;
    input.value = value;
  })

  target.querySelector('.js-down').addEventListener('click', () => {
    input.focus();
    value = parseInt(value) - 1;
    value = value < 0 ? 0 : value;
    input.value = value;
  })
}

function galleryInit() {
  GLightbox({
    selector: '.js-gallery',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
  });
}

function pinOnScroll() {
  const target = document.querySelectorAll('.js-pin-container');
  if (!target) return;

  target.forEach(el => {
    const sceneDuration = el.offsetHeight;
    const sceneOffset = el.querySelector('.js-pin-content').offsetHeight + 20;

    const scene = new ScrollMagic.Scene({
      duration: sceneDuration - sceneOffset,
      offset: sceneOffset,
      triggerElement: el,
      triggerHook: "onEnter",
    })
    .setPin(".js-pin-content")
    .addTo(App.SMcontroller)

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      scene.duration('1px');
      scene.refresh();
    } else {
      scene.duration(sceneDuration - sceneOffset);
      scene.refresh();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration('1px');
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }
    })
  });
}

function comingSoon() {
  const target = document.querySelector('.js-soon-timer');
  if (!target) return;

  var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

  var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.js-soon-days').innerHTML = days;
    document.querySelector('.js-soon-hours').innerHTML = hours;
    document.querySelector('.js-soon-minutes').innerHTML = minutes;
    document.querySelector('.js-soon-seconds').innerHTML = seconds;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function mapInit() {
  const target = document.querySelector("#map");
  if (!target) return;

  const map = L.map(target).setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .openPopup();
}

const MainSlider = (function() {
  // const slider = document.querySelector('.js-slider');
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-slider'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
    });
  }

  function numberPagination() {
    const pagination = document.querySelector('.js-slider .js-pag-numbers');
    const current = pagination.querySelector('.js-current');
    const all = pagination.querySelector('.js-all');

    current.innerHTML = '01';
    all.innerHTML = '0' + sliderInstance.slides.length;

    sliderInstance.on('slideChangeTransitionStart', function () {
      current.innerHTML = `0${sliderInstance.activeIndex + 1}`;
    });
  }

  function pagination() {
    const pagination = document.querySelector('.js-slider .js-pag');
    const items = pagination.querySelectorAll('.js-pag-item');

    sliderInstance.on('slideChangeTransitionStart', function () {
      pagination.querySelector('.is-active').classList.remove('is-active');
      items[sliderInstance.activeIndex].classList.add('is-active');
    });

    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      
      el.addEventListener('click', (e) => {
        sliderInstance.slideTo(i)
      })
    }
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(button, {
        opacity: 0,
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(button, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, ">-0.3");
  }

  function init() {
    if (!document.querySelector('.js-slider')) return;
    sliderInit();
    sliderEvents();
    pagination();
    numberPagination();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal = (function() {
  let slider;
  let content;
  let title;
  let titleLines;
  let button;
  let paginationNumbers;
  let socials;
  let pagination;
  let scroll;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-slider');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    button = content.querySelector('.js-button');
    paginationNumbers = document.querySelector('.js-pag-numbers');
    socials = document.querySelector('.js-socials');
    pagination = document.querySelector('.js-pag');
    scroll = document.querySelector('.js-scroll');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-slider')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set([button, paginationNumbers, socials, pagination, scroll], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-slider')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(button, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
      .to([paginationNumbers, socials, pagination, scroll], {
        stagger: 0.1,
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0px',
      }, '>-1.0');
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSlider2 = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    const slider = document.querySelector('.js-mainSlider-type-2');
    if (!slider) return;

    sliderInstance = new Swiper(slider, {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: slider.querySelector('.js-nav-prev'),
        nextEl: slider.querySelector('.js-nav-next'),
      },
      pagination: {
        el: slider.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });

    const pagination = slider.querySelectorAll('.js-pagination > div')

    for (let i = 1; i < pagination.length + 1; i++) {
      pagination[i - 1].innerHTML = '0' + i;
    }
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const slider = document.querySelector('.js-mainSlider-type-2');
    if (!slider) return;
    const lines = slider.querySelectorAll('.js-title .split__line')
    const text = slider.querySelectorAll('.js-text')
    const button = slider.querySelectorAll('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    const slider = document.querySelector('.js-mainSlider-type-2');
    if (!slider) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal2 = (function() {
  let slider;
  let content;
  let title;
  let text;
  let titleLines;
  let button;
  let paginationNumbers;
  let socials;
  let pagination;
  let scroll;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-2');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    text = content.querySelector('.js-text');
    button = content.querySelector('.js-button');
    paginationNumbers = document.querySelector('.js-pag-numbers');
    socials = document.querySelector('.js-socials');
    pagination = document.querySelector('.js-pag');
    scroll = document.querySelector('.js-scroll');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-2')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set([text, button, paginationNumbers, socials, pagination, scroll], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-2')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(text, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-1.0')
      .to(button, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
      
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSlider3 = (function() {
  let sliderInstance;
  let currentIndex = 0;
  
  function sliderInit() {
    const slider = document.querySelector('.js-mainSlider-type-3');
    if (!slider) return;

    sliderInstance = new Swiper(slider, {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: slider.querySelector('.js-nav-prev'),
        nextEl: slider.querySelector('.js-nav-next'),
      },
      pagination: {
        el: slider.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const slider = document.querySelector('.js-mainSlider-type-3');
    if (!slider) return;
    const lines = slider.querySelectorAll('.js-title .split__line')
    const text = slider.querySelectorAll('.js-text')
    const button = slider.querySelectorAll('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    const target = document.querySelector('.js-mainSlider-type-3');
    if (!target) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal3 = (function() {
  let slider;
  let content;
  let title;
  let titleLines;
  let button;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-3');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    button = content.querySelector('.js-button');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-3')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set(button, {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-3')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(button, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSlider4 = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-mainSlider-type-4'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: document.querySelector('.js-mainSlider-type-4 .js-nav-prev'),
        nextEl: document.querySelector('.js-mainSlider-type-4 .js-nav-next'),
      },
      pagination: {
        el: document.querySelector('.js-mainSlider-type-4 .js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const lines = document.querySelectorAll('.js-mainSlider-type-4 .js-title .split__line')
    const text = document.querySelectorAll('.js-mainSlider-type-4 .js-text')
    const button = document.querySelectorAll('.js-mainSlider-type-4 .js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function pagination() {
    const pagination = document.querySelector('.js-mainSlider-type-4 .js-navigation');
    const items = pagination.querySelectorAll('.js-navigation-item');

    sliderInstance.on('slideChangeTransitionStart', function () {
      pagination.querySelector('.is-active').classList.remove('is-active');
      items[sliderInstance.activeIndex].classList.add('is-active');
    });

    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      
      el.addEventListener('click', (e) => {
        sliderInstance.slideTo(i)
      })
    }
  }

  function init() {
    if (!document.querySelector('.js-mainSlider-type-4')) return;
    sliderInit();
    pagination();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal4 = (function() {
  let slider;
  let content;
  let title;
  let titleLines;
  let text;
  let button;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-4');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    text = content.querySelector('.js-text');
    button = content.querySelector('.js-button');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-4')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })

    gsap.set(text, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set(button, {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-4')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(text, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.9')
      .to(button, {
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSlider5 = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-mainSlider-type-5'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: document.querySelector('.js-mainSlider-type-5 .js-nav-prev'),
        nextEl: document.querySelector('.js-mainSlider-type-5 .js-nav-next'),
      },
      pagination: {
        el: document.querySelector('.js-mainSlider-type-5 .js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const lines = document.querySelectorAll('.js-mainSlider-type-5 .js-title .split__line')
    const text = document.querySelectorAll('.js-mainSlider-type-5 .js-text')
    const button = document.querySelectorAll('.js-mainSlider-type-5 .js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    if (!document.querySelector('.js-mainSlider-type-5')) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal5 = (function() {
  let slider;
  let content;
  let title;
  let titleLines;
  let text;
  let button;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-5');
    content = document.querySelector('.js-mainSlider-type-5 .js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    text = content.querySelector('.js-text');
    button = content.querySelector('.js-button');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-5')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })

    gsap.set(text, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set(button, {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-5')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(text, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.9')
      .to(button, {
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSlider9 = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-mainSlider-type-9'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      direction: 'vertical',
      mousewheel: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: document.querySelector('.js-mainSlider-type-9 .js-nav-prev'),
        nextEl: document.querySelector('.js-mainSlider-type-9 .js-nav-next'),
      },
      pagination: {
        el: document.querySelector('.js-mainSlider-type-9 .js-pagination'),
        type: 'progressbar',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const lines = document.querySelectorAll('.js-mainSlider-type-9 .js-title .split__line')
    const text = document.querySelectorAll('.js-mainSlider-type-9 .js-text')
    const button = document.querySelectorAll('.js-mainSlider-type-9 .js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    if (!document.querySelector('.js-mainSlider-type-9')) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal9 = (function() {
  let slider;
  let items;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-9');
    items = document.querySelectorAll('.js-mainSlider-type-9 .js-all-item');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-9')) {
      return;
    }

    initVars();

    gsap.set([headerItems, items], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-9')) {
      return;
    }
    
    gsap.timeline()
      .to(headerItems, {
        duration: 0.8,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      })
      .to(items, {
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      }, '>-0.2')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();

const MainSliderAll = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-mainSlider-type-all'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      // direction: 'vertical',
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: document.querySelector('.js-mainSlider-type-all .js-nav-prev'),
        nextEl: document.querySelector('.js-mainSlider-type-all .js-nav-next'),
      },
      pagination: {
        el: document.querySelector('.js-mainSlider-type-all .js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const lines = document.querySelectorAll('.js-mainSlider-type-all .js-title .split__line')
    const text = document.querySelectorAll('.js-mainSlider-type-all .js-text')
    const button = document.querySelectorAll('.js-mainSlider-type-all .js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    if (!document.querySelector('.js-mainSlider-type-all')) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderRevealAll = (function() {
  let slider;
  let items;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-all');
    items = document.querySelectorAll('.js-mainSlider-type-all .js-all-item');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-all')) {
      return;
    }

    initVars();

    gsap.set([headerItems, items], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-all')) {
      return;
    }
    
    gsap.timeline()
      .to(headerItems, {
        duration: 0.8,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      })
      .to(items, {
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      }, '>-0.2')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();


const Accordion = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-accordion");

    if (!targets) return;

    for (let i = 0; i < targets.length; i++) {
      const items = targets[i].querySelectorAll('.accordion__item');

      for (let l = 0; l < items.length; l++) {
        items[l].addEventListener("click", (e) => {
          items[l].classList.toggle('is-active');
          const content = items[l].querySelector('.accordion__content');
  
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    }
  }

  return {
    init: init,
  }
})();
const Tabs = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-tabs");
    if (!targets) return;

    targets.forEach(el => {
      singleTab(el)
    })
  }

  function singleTab(target) {
    const controls = target.querySelector('.js-tabs-controls');
    const controlsItems = target.querySelectorAll('.js-tabs-controls .tabs__button');
    const content = target.querySelector('.js-tabs-content');

    for (let l = 0; l < controlsItems.length; l++) {
      const el = controlsItems[l];
      
      el.addEventListener("click", (e) => {
        const selector = el.getAttribute('data-tab-target');

        controls.querySelector('.is-active').classList.remove('is-active')
        content.querySelector('.is-active').classList.remove('is-active')

        el.classList.add('is-active')
        content.querySelector(selector).classList.add('is-active')
      });
    }
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
	09. Contact form
---------------------------------------------------*/

function contactForm() {

  const form = document.querySelector(".js-ajax-form");
  
  if (!form) {
    return;
  }

  const formAlert = form.querySelector('.js-ajax-form-alert');
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let validForm = true;
    let formData = {};
    formAlert.classList.remove('is-active');
    formAlert.classList.remove('is-success');
    formAlert.classList.remove('is-error');
    const inputGroups = form.querySelectorAll('.js-input-group');


    form.querySelectorAll('.form__error').forEach(el => {
      el.innerHTML = '';
      el.classList.remove('is-active');
    });
    form.querySelectorAll('.-error').forEach(el => {
      el.classList.remove('-error');
    });


    for (let i = 0; i < inputGroups.length; i++) {
      const el = inputGroups[i];
      
      let field;
      
      if (el.querySelector('input')) {
        field = el.querySelector('input');
      } else if (el.querySelector('textarea')) {
        field = el.querySelector('textarea');
      }

      let fieldName = field.getAttribute('name');
      let fieldValue = field.value;
      let errorField = el.querySelector('.form__error');

      
      if (field.hasAttribute('data-required') && !fieldValue) {
        field.classList.add('-error');
        validForm = false;
        errorField.classList.add('is-active');
        errorField.innerHTML = 'Please fill this field';
        continue;
      }
    
      if (field.getAttribute('name') === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
          field.classList.add('-error');
          validForm = false;
          errorField.classList.add('is-active');
          errorField.innerHTML = 'Please enter correct email';
          continue;
        }
      }
    
      formData[fieldName] = fieldValue;
    }


    if (!validForm) return;

    let requestData = '';
    let request = new XMLHttpRequest();
    let dataArray = [];

    for (let property in formData) {
      dataArray.push(`${property}=${formData[property]}`);
      requestData = dataArray.join('&');
    }
    
    setTimeout(() => {
      request.onreadystatechange = function() {
        setTimeout(() => {
          if (this.readyState == 4 && this.status == 200) {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-success');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-success');
          } else {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-error');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-error');
          }
        }, 400);
      };
  
      request.open("POST", "contact.php", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded",
      );
      request.send(requestData);
    }, 1000);
  });

}

/*--------------------------------------------------
  03. Sidebar
---------------------------------------------------*/

function sidebar() {
  const target = document.querySelector('.js-sidebar')
  const openButton = document.querySelector('.js-sidebar-open')
  const closeButton = document.querySelector('.js-sidebar-close')
  if (!target || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => target.classList.add('is-open'))
  closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}


function searchbar() {
  const target = document.querySelector('.js-headerSearch')
  if (!target) return;
  const field = target.querySelector('input')
  const openButton = document.querySelector('.js-headerSearch-open')
  const closeButton = target.querySelector('.js-headerSearch-close')

  openButton.addEventListener('click', () => {
    target.classList.add('is-open')
    field.focus()
  })
  closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}


function mobileMenu() {
  const target = document.querySelector('.js-mobileMenu')
  const openButton = document.querySelector('.js-mobileMenu-open')
  if (!target || !openButton) return;

  openButton.addEventListener('click', () => {
    target.classList.toggle('is-open')
    App.html.classList.toggle('overflow-hidden')
  })
  // closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}

/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function SectionSlider() {
  const sectionSlider = document.querySelectorAll('.js-sectionSlider');

  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.hasAttribute('data-pagination')) {
      pagination = {
        el: el.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      };
    }
   
    const colsArray = el.getAttribute('data-slider-col').split(' ');

    let cols_base = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 800,
      autoHeight: true,
      spaceBetween: parseInt(gap),
      centeredSlides: centered,
      parallax: true,
      watchSlidesVisibility: true,

      loop: loop,
      loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      lazy: {
        loadPrevNext: true,
      },

      slidesPerView: parseInt(cols_base),

      breakpoints: {
        1199: { slidesPerView: parseInt(cols_lg) },
        991:  { slidesPerView: parseInt(cols_md) },
        767:  { slidesPerView: parseInt(cols_sm) },
      },

      navigation: {
        prevEl: el.querySelector('.js-prev'),
        nextEl: el.querySelector('.js-next'),
      },

      pagination: pagination,
    });
  }
}

/*--------------------------------------------------
  01. Custom easings
---------------------------------------------------*/

function customEasingsInit() {
  CustomEase.create("quart.out", "0.25, 1, 0.5, 1");
  CustomEase.create("quart.inOut", "0.76, 0, 0.24, 1");
}

/*--------------------------------------------------
  02. Preloader
---------------------------------------------------*/

const Preloader = (function() {

  const preloader = document.querySelector('.js-preloader');
  const bg = preloader.querySelector('.preloader__bg');
  const progress = preloader.querySelector('.preloader__progress');
  const progressInner = preloader.querySelector('.preloader__progress__inner');

  function initial() {

    gsap.registerEffect({
      name: 'preloaderInitial',
      effect: (target, config) => {

        document.documentElement.classList.add('html-overflow-hidden');
        const tl = gsap.timeline();

        if (!document.body.classList.contains('preloader-visible')) {
          document.documentElement.classList.remove('html-overflow-hidden');
          return tl;
        }
        
        return tl
          .fromTo(progressInner, {
            scaleY: 0,
          }, {
            scaleY: 1,
            ease: 'none',
            duration: 1,
            delay: 0.3,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(progress, {
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
          }, '>-0.1')
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
            },
          }, '>-0.5')

      },
      extendTimeline: true,
    });

  }

  function show() {

    gsap.registerEffect({
      name: 'preloaderShow',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        if (!preloader) {
          return tl;
        }
    
        tl
          .set(progress, {
            opacity: 0,
            scale: 0.75,
          })
          .set(progressInner, {
            scaleY: 0,
          })
    
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 1,
            onStart: () => {
              bg.classList.remove('origin-top');
              document.documentElement.classList.add('html-overflow-hidden');
            },
          })
          .to(progress, {
            delay: 0.1,
            duration: 0.6,
            ease: 'quart.out',
            opacity: 1,
            scale: 1,
          })
          .to(progressInner, {
            scaleY: 1,
            duration: 1,
            ease: 'none',
          }, '>-0.3')
    
    
        return tl;
    
      },
      extendTimeline: true,
    });

  }
  
  function hide() {

    gsap.registerEffect({
      name: 'preloaderHide',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        return tl
          .to(progress, {
            delay: 0.15,
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
              document.documentElement.classList.remove('overflow-hidden');
              document.body.classList.remove('overflow-hidden');
            },
          }, '>-0.5')
    
      },
      extendTimeline: true,
    });

  }

  function init() {

    if (!preloader) return;

    initial();
    show();
    hide();

  }

  return {
    init: init,
  }

})();

/*--------------------------------------------------
  03. Header
---------------------------------------------------*/

const Header = (function() {

  let menu;
  let mobileBg;
  let navList;
  let mobileFooter;
  let navListLinks;
  
  let navBtnOpen;
  let navBtnClose;
  let navBtnListBack;

  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    menu = document.querySelector('.js-menu');
    mobileBg = menu.querySelector('.js-mobile-bg');
    mobileFooter = menu.querySelector('.js-mobile-footer');
    navList = document.querySelector('.js-navList');
    navListLinks = document.querySelectorAll('.js-navList > li > a');

    navBtnOpen = document.querySelector('.js-nav-open');
    navBtnClose = document.querySelector('.js-nav-close');
    navBtnListBack = document.querySelector('.js-nav-list-back');
    menuDeepLevel = 0;
  }

  
  function init() {
    updateVars();
    menuListBindEvents();
    menuAnimBindEvents();
    classicMenuInit();
    // headerSticky();
  }

  function deepLevelCheck(level, htmlText = '') {
    if (level) {
      gsap.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        y: '0px',
        opacity: 1,
        onStart: () => {
          navBtnListBack.classList.remove('pointer-events-none');
          navBtnListBack.querySelector('a').innerHTML = htmlText;
        },
      })

      gsap.to(mobileFooter, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          mobileFooter.classList.add('pointer-events-none');
        },
      })
    } else {
      gsap.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          navBtnListBack.classList.add('pointer-events-none');
        },
      })

      gsap.to(mobileFooter, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 1,
        onStart: () => {
          mobileFooter.classList.remove('pointer-events-none');
        },
      })
    }
  }

  function menuListBindEvents() {
    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');
    if (!listItems.length) return;

    navBtnListBack.addEventListener('click', () => {
      const visibleList = navList.querySelector('ul.is-active');
      const parentList = visibleList.parentElement.parentElement;

      menuDeepLevel--;

      deepLevelCheck(menuDeepLevel, parentList.parentElement.querySelector('li > a').innerHTML);
      menuListStepAnimate(visibleList, parentList);
    });
    
    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;

        deepLevelCheck(menuDeepLevel, parentLink.innerHTML);
        menuListStepAnimate(parent, subnavList);
      });
    });
  }

  function menuListStepAnimate(hideList, showList) {
    const navBtnClose = document.querySelector('.js-nav-close');
    
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    timeline
      .clear()
      .to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 1.0,
        y: '100%',
        onStart: () => {
          showList.classList.add('is-active');
          hideList.classList.remove('is-active');
          navBtnClose.classList.add('pointer-events-none');
        },
      })
      .to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
        onComplete: () => {
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '>-0.6')
  }

  function menuAnimBindEvents() {
    if (!navBtnOpen) return;

    navBtnOpen.addEventListener('click', () => {
      App.html.classList.add('html-overflow-hidden');
      showMenu();
    });

    navBtnClose.addEventListener('click', () => {
      App.html.classList.remove('html-overflow-hidden');
      hideMenu();
    })
  }

  function showMenu() {

    menu.classList.add('is-active');

    gsap.timeline()
      .set(navListLinks, { opacity: 1, })
      .set(navBtnListBack, { opacity: 0, })

      .fromTo(mobileBg, {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "quart.inOut",
        onStart: () => {
          navBtnOpen.classList.add('pointer-events-none');
        }
      })

      .fromTo(navBtnOpen, {
        y: '0px',
        opacity: 1,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '-16px',
        opacity: 0,
      }, '>-0.2')
      .fromTo(navBtnClose, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '0px',
        opacity: 1,
      }, '<0.2')

      .fromTo(navListLinks, {
        y: '100%',
      }, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
      }, '>-0.7')
      .fromTo(mobileFooter, {
        y: '30px',
        opacity: 0,
      }, {
        ease: 'quart.out',
        duration: 1.2,
        y: '0px',
        opacity: 1,
        onComplete: () => {
          navList.classList.add('is-active');
          navBtnClose.classList.remove('pointer-events-none');
        }
      }, '>-0.5')

  }

  function hideMenu() {
    const navVisibleList = menu.querySelector('.is-active');
    const navActiveListLinks = menu.querySelectorAll('.is-active > li > a');
    menuDeepLevel = 0;

    gsap.timeline()
      .to([navBtnClose, navBtnListBack, mobileFooter], {
        ease: "quart.out",
        duration: 0.6,
        opacity: 0,
        y: '-16px',
        onStart: () => {
          navBtnClose.classList.add('pointer-events-none');
          navVisibleList.classList.remove('is-active');
          mobileBg.classList.add('origin-top');
        },
      })

      .fromTo(navBtnOpen, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.7,
        y: '0px',
        opacity: 1,
      }, '<0.1')

      .to(navActiveListLinks, {
        ease: "quart.out",
        duration: 0.8,
        y: '-100%',
      }, '>-0.6')

      .to(mobileBg, {
        ease: "quart.inOut",
        duration: 0.8,
        scaleY: 0,
        onComplete: () => {
          navBtnOpen.classList.remove('pointer-events-none');
          mobileBg.classList.remove('origin-top');
          menu.classList.remove('is-active');
        },
      }, '>-0.6')

  }

  function classicMenuInit() {

    const target = document.querySelectorAll('.js-navClassic-list .menu-item-has-children');
  
    if (!target.length) return;
  
    const header = document.querySelector('.header');
    let dropDownTheme;
  
    if (header.classList.contains('js-header-dark')) {
      dropDownTheme = 'dark';
    } else {
      dropDownTheme = 'light';
    }
  
    target.forEach(el => {
      let subnav = el.children;
      let where = 'bottom';
      subnav = subnav[subnav.length - 1];

      if (
        el.closest(".menu-item-has-children") &&
        el.closest(".subnav-list")
      ) {
        where = 'right';
      }
      
      tippy(el, {
        interactive: true,
        content: subnav,
        allowHTML: true,
        placement: where,
        offset: [40, 0],
        delay: [null, 200],
  
        theme: dropDownTheme,
        animation: 'shift',
  
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left-start'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
              },
            },
          ],
        },
      });
    });
  
  }
  
  function headerSticky() {
    const header = document.querySelector('.js-header');
    if (!header) return;
  
    new ScrollMagic.Scene({
      offset: '6px',
    })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  }


  return {
    headerSticky: headerSticky,
    init: init,
  }

})();

/*--------------------------------------------------
  04. Page reveals
---------------------------------------------------*/

function pageRevealEffects() {

  // masthead shapes
  gsap.registerEffect({
    name: 'mastheadShapes',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        opacity: 0,
        y: config.y,
      }, {
        ease: config.easing,
        duration: config.duration,
        opacity: 1,
        y: '0%',
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 3.0,
      y: '90%',
    },
  });

  // header, menu and ui elements
  gsap.registerEffect({
    name: 'uiElementsAnimate',
    effect: (target, config) => {

      let headerLogo;
      let headerMenu;
      let classicMenu;
      let uiElements;

      if (document.querySelector('.js-header-logo')) {
        headerLogo = document.querySelector('.js-header-logo');
      }
      if (document.querySelector('.js-header-menu')) {
        headerMenu = document.querySelector('.js-header-menu');
      }
      if (document.querySelector('.js-navClassic-list > li > a')) {
        classicMenu = document.querySelectorAll('.js-navClassic-list > li > a');
      }
      if (document.querySelector('.js-ui')) {
        uiElements = document.querySelectorAll('.js-ui');
      }

      if (!headerLogo && !headerMenu && !uiElements && !classicMenu) return;

      return gsap.fromTo([
        headerLogo,
        headerMenu,
        classicMenu,
        uiElements,
      ], {
        y: config.y,
        opacity: 0,
      }, {
        ease: config.easing,
        duration: config.duration,
        y: '0px',
        opacity: 1,
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 0.8,
      y: '30px',
    },
  });

  // masthead background
  gsap.registerEffect({
    name: 'mastheadBackground',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        scale: 1.4,
        opacity: 0,
      }, {
        ease: 'quart.inOut',
        duration: 1.4,
        scale: 1,
        opacity: 1,
      })
  
    },
    extendTimeline: true,
  });

}


const PageReveal = (function() {

  function mastheadType_1(tl) {

    if (!document.querySelector('.js-masthead-type-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-1');
    let title = false;
    let text = masthead.querySelector('.js-text');
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }


    const splitTitle = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };
    
    const textButton = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
      opacity: 1,
    };


    gsap.set([text, button], {
      y: '35px',
      opacity: 0,
    })


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(title, splitTitle, '>-2.3')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(title, splitTitle, '>-0.5')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

  }

  function base(tl) {
    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      return tl;
    }

    tl.add(() => {
      RevealAnim.init();
    })
  }

  function init(tl) {
    MainSliderReveal.prepareAnimation()
    MainSliderReveal2.prepareAnimation()
    MainSliderReveal3.prepareAnimation()
    MainSliderReveal4.prepareAnimation()
    MainSliderReveal5.prepareAnimation()
    MainSliderReveal9.prepareAnimation()
    MainSliderRevealAll.prepareAnimation()

    tl.add(() => {
      MainSliderReveal.animate()
      MainSliderReveal2.animate()
      MainSliderReveal3.animate()
      MainSliderReveal4.animate()
      MainSliderReveal5.animate()
      MainSliderReveal9.animate()
      MainSliderRevealAll.animate()
    })

    base(tl);
  
    return tl;
  }

  return {
    init: init,
  }

})();


function initialReveal(callback) {
  let tl = gsap.timeline();
  tl.preloaderInitial();
  tl = PageReveal.init(tl);
  tl.add(function () { callback(); })
}

/*--------------------------------------------------
  05. Custom cursor
---------------------------------------------------*/

const Cursor = (function() {

  const cursor = document.querySelector(".js-cursor");
  let follower;
  let label;
  let icon;

  let clientX;
  let clientY;
  let cursorWidth;
  let cursorHeight;
  let cursorTriggers;
  let state;

  function variables() {

    follower = cursor.querySelector(".js-follower");
    label = cursor.querySelector(".js-label");
    icon = cursor.querySelector(".js-icon");

    clientX = -100;
    clientY = -100;
    cursorWidth = cursor.offsetWidth / 2;
    cursorHeight = cursor.offsetHeight / 2;
    cursorTriggers;
    state = false;

  }

  function init() {

    if (!cursor) return;

    variables();
    state = true;
    cursor.classList.add('is-enabled');

    document.addEventListener("mousedown", e => {
      cursor.classList.add('is-mouse-down');
    });

    document.addEventListener("mouseup", e => {
      cursor.classList.remove('is-mouse-down');
    });

    document.addEventListener("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
    });

    const render = () => {
      cursor.style.transform = `translate(${clientX - cursorWidth}px, ${clientY - cursorHeight}px)`;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    update();
    breakpoint();

  }

  function enterHandler({ target }) {

    cursor.classList.add('is-active');

    if (target.getAttribute('data-cursor-label')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label');
      label.innerHTML = target.getAttribute('data-cursor-label');
    }

    if (target.getAttribute('data-cursor-icon')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-icon');
      const iconAttr = target.getAttribute('data-cursor-icon');
      icon.innerHTML = feather.icons[iconAttr].toSvg();
    }

  }
  
  function leaveHandler() {

    App.body.classList.remove('is-cursor-active');
    cursor.classList.remove('is-active');
    cursor.classList.remove('has-label');
    cursor.classList.remove('has-icon');
    label.innerHTML = '';
    icon.innerHTML = '';

  }

  function update() {

    if (!cursor) return;

    cursorTriggers = document.querySelectorAll([
      "button",
      "a",
      "input",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-cursor-icon]",
      "textarea"
    ]);
    
    cursorTriggers.forEach(el => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

  }

  function clear() {

    if (!cursor) return;
    
    cursorTriggers.forEach(el => {
      el.removeEventListener("mouseenter", enterHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    });

  }

  function hide() {

    if (!cursor) return;
    cursor.classList.add('is-hidden');

  }

  function show() {

    if (!cursor) return;
    cursor.classList.remove('is-hidden');

  }

  function breakpoint() {

    if (!state) return;
    if (!App.config.cursorFollower.disableBreakpoint) return;

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < App.config.cursorFollower.disableBreakpoint) {
      state = false;
      cursor.classList.remove('is-enabled');
      clear();
    } else {
      state = true;
      cursor.classList.add('is-enabled');
      update();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < App.config.cursorFollower.disableBreakpoint) {
        state = false;
        cursor.classList.remove('is-enabled');
        clear();
      } else {
        state = true;
        cursor.classList.add('is-enabled');
        update();
      }
    })

  }

  return {
    init: init,
    leaveHandler: leaveHandler,
    update: update,
    clear: clear,
    hide: hide,
    show: show,
  };

})();

/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {

  function single() {
    const animationTarget = document.querySelectorAll('[data-anim]');
    if (!animationTarget.length) return;

    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.js-chart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-chart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count);
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }
  
  function splitLines(target, animDelay = 0) {
  
    const lines = target.querySelectorAll('.split__line');

    gsap.to(lines, {
      delay: animDelay,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power2.out',
      y: '0%',
    });
  
  }


  function init() {

    single();
    container();

  }


  return {
    init: init,
  }

})();


function splitTextIntoLines() {
  
  let target;

  if (App.body.classList.contains('page-reveal-off')) {
    target = document.querySelectorAll("[data-split='lines']:not([data-split-page-reveal])");
  } else {
    target = document.querySelectorAll("[data-split='lines']");
  }

  if (!target.length) return;

  target.forEach(el => {
    let content;
    let test = el.querySelectorAll('* > *:not(br):not(span)');

    if (test.length > 0) {
      content = el.querySelectorAll('* > *:not(br):not(span)');
    }

    new SplitText(content, {
      type: 'lines',
      linesClass: 'overflow-hidden',
    });

    content.forEach(el => {
      const lines = el.querySelectorAll('.overflow-hidden');

      new SplitText(lines, {
        type: 'lines',
        linesClass: 'split__line',
      });
    });

    gsap.set(el.querySelectorAll('.split__line'), {
      y: '100%',
    })
  });

}


function splitIntoLines(target) {
  if (!target) return;

  let content;
  let test = target.querySelectorAll('* > *:not(br):not(span)');

  if (test.length > 0) {
    content = target.querySelectorAll('* > *:not(br):not(span)');
  }

  new SplitText(content, {
    type: 'lines',
    linesClass: 'overflow-hidden',
  });

  content.forEach(el => {
    const lines = el.querySelectorAll('.overflow-hidden');

    new SplitText(lines, {
      type: 'lines',
      linesClass: 'split__line',
    });
  });

  gsap.set(target.querySelectorAll('.split__line'), {
    y: '100%',
  })
}

/*--------------------------------------------------
	09. Contact form
---------------------------------------------------*/

function contactForm() {

  const form = document.querySelector(".js-ajax-form");
  
  if (!form) {
    return;
  }

  const formAlert = form.querySelector('.js-ajax-form-alert');
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let validForm = true;
    let formData = {};
    formAlert.classList.remove('is-active');
    formAlert.classList.remove('is-success');
    formAlert.classList.remove('is-error');
    const inputGroups = form.querySelectorAll('.js-input-group');


    form.querySelectorAll('.form__error').forEach(el => {
      el.innerHTML = '';
      el.classList.remove('is-active');
    });
    form.querySelectorAll('.-error').forEach(el => {
      el.classList.remove('-error');
    });


    for (let i = 0; i < inputGroups.length; i++) {
      const el = inputGroups[i];
      
      let field;
      
      if (el.querySelector('input')) {
        field = el.querySelector('input');
      } else if (el.querySelector('textarea')) {
        field = el.querySelector('textarea');
      }

      let fieldName = field.getAttribute('name');
      let fieldValue = field.value;
      let errorField = el.querySelector('.form__error');

      
      if (field.hasAttribute('data-required') && !fieldValue) {
        field.classList.add('-error');
        validForm = false;
        errorField.classList.add('is-active');
        errorField.innerHTML = 'Please fill this field';
        continue;
      }
    
      if (field.getAttribute('name') === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
          field.classList.add('-error');
          validForm = false;
          errorField.classList.add('is-active');
          errorField.innerHTML = 'Please enter correct email';
          continue;
        }
      }
    
      formData[fieldName] = fieldValue;
    }


    if (!validForm) return;

    let requestData = '';
    let request = new XMLHttpRequest();
    let dataArray = [];

    for (let property in formData) {
      dataArray.push(`${property}=${formData[property]}`);
      requestData = dataArray.join('&');
    }
    
    setTimeout(() => {
      request.onreadystatechange = function() {
        setTimeout(() => {
          if (this.readyState == 4 && this.status == 200) {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-success');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-success');
          } else {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-error');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-error');
          }
        }, 400);
      };
  
      request.open("POST", "contact.php", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded",
      );
      request.send(requestData);
    }, 1000);
  });

}

/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) {
    return;
  }
  
  const target = document.querySelectorAll('[data-parallax]');

  target.forEach(el => {
    const value = el.getAttribute('data-parallax');

    jarallax(el, {
      speed: value,
      imgElement: '[data-parallax-target]',
    });
  });
}

/*--------------------------------------------------
  13. To top button
---------------------------------------------------*/

function backButton() {
  const button = document.querySelector('.js-backButton');
  if (!button) return;

  const scrollElement = window.document.documentElement;

  const duration = () => {
    if (scrollElement.scrollTop < 1600) {
      return 1;
    } else {
      return 2.2;
    }
  }

  button.addEventListener('click', () => {
    gsap.to(scrollElement, {
      duration: duration(),
      ease: 'power2.inOut',
      scrollTo: 0,
    });
  })

//   new ScrollMagic.Scene({
//     offset: '400px',
//   })
//     .setClassToggle(button, 'is-visible')
//     .addTo(App.SMcontroller);
}

/*--------------------------------------------------
  14. Scroll down button
---------------------------------------------------*/

function uiScrollDown() {

  const target = document.querySelector('.js-ui-scroll-button');

  if (!target) return;

  const destination = document.querySelector('section:nth-of-type(2)');

  target.addEventListener('click', () => {
    gsap.to(window.document.documentElement, {
      duration: 1,
      ease: 'power2.inOut',
      scrollTo: destination.offsetTop,
    });
  })

}

/*--------------------------------------------------
  15. Video
---------------------------------------------------*/

function videoBtn() {

  GLightbox({
    autoplayVideos: false,
    touchNavigation: false,
  });

}

/*--------------------------------------------------
  16. Scroll to id
---------------------------------------------------*/

function scrollToIdInit() {

  const targets = document.querySelectorAll('.js-scroll-to-id');

  if (!targets.length) return;

  targets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('href');
      const destination = document.querySelector(`#${id.slice(1)}`);

      // console.log(destination);
      // console.log(destination.offsetTop);

      gsap.to(window.document.documentElement, {
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTo: destination.offsetTop,
      });
    })
  });

}

/*--------------------------------------------------
  17. PJAX
---------------------------------------------------*/

const PJAX = (function() {
  function initNewPage(data) {
    return new Promise((resolve) => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      App.SMcontroller.destroy(true);
      App.SMcontroller = new ScrollMagic.Controller();

      if (App.config.cursorFollower.enabled) {
        Cursor.leaveHandler();
        Cursor.clear();
        Cursor.update();
      }

      initComponents();
      resolve(true);
    });
  }

  const generalTransition = {
    name: 'generalTransition',

    leave: (data) => {
      return new Promise((resolve) => {
        gsap.timeline()
          .preloaderShow()
          .add(() => {
            resolve(true);
          })
      });
    },

    enter: (data) => {
      return new Promise((resolve) => {
        initNewPage(data).then(() => resolve(true));
      });
    },

    afterEnter: (data) => {
      return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.preloaderHide();
        tl = PageReveal.init(tl);
        tl.add(() => {
          resolve(true);
        });
      });
    }
  }

  function init() {
    if (!document.body.hasAttribute('data-barba')) return;

    barba.init({
      sync: true,
      timeout: 10000,
      prevent: ({ el }) => {

				// element doesn't has attribute
        if (!el.hasAttribute('data-barba')) return true;

				// element is anchor
				if (el.getAttribute('href').indexOf('#') > -1) return true;

				// elementor preview
				if (typeof elementor === 'object') return true;

      },
      transitions: [
        generalTransition,
      ],
    });
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
	10. Isotope grids
---------------------------------------------------*/

function masonryFilterInit() {

  const filterGrids = document.querySelectorAll('.section-filter');

  if (!filterGrids.length) {
    return;
  }

  for (let i = 0; i < filterGrids.length; i++) {
    const el = filterGrids[i];

    let iso = new Isotope(el.querySelector('.masonry'), {
      itemSelector: '.masonry__item',
      percentPosition: true,
      // horizontalOrder: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });


    const filterButtons = el.querySelectorAll(".filter-button-group button");
  
    for (let i = 0; i < filterButtons.length; i++) {
      const el = filterButtons[i];

      el.addEventListener("click", () => {

        let someom = iso.getItemElements();
        someom.forEach(el => {
          el.classList.remove('is-active');
        });

        filterButtons.forEach(button => button.classList.remove('btn-active'));
        el.classList.add('btn-active');

        let filterValue = el.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });

      });
    }
  }

}


function masonryGridInit() {

  const grids = document.querySelectorAll('.js-masonry.js-masonry-no-filter');

  if (!grids.length) {
    return;
  }

  for (let i = 0; i < grids.length; i++) {
    new Isotope(grids[i], {
      itemSelector: '.masonry__item',
      percentPosition: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });
  }
  
}

})();
