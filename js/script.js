document.addEventListener("DOMContentLoaded", function () {
  // 쇼룸이미지
  const shopImg = document.querySelectorAll(".shop_img");
  const popup = document.querySelectorAll(".popup");

  for (let i = 0; i < popup.length; i++) {
    popup[i].addEventListener("mouseenter", function () {
      shopImg[i].classList.add("on");
    });

    popup[i].addEventListener("mouseleave", function () {
      shopImg[i].classList.remove("on");
    });
  }

  // 서브메뉴
  const subMenu = document.querySelectorAll(`.menu_text`);
  const tabData = document.querySelectorAll(`.submenu`);
  const bannerBg = document.querySelector(`.banner_bg`);
  const wrapBg = document.querySelector(`.wrap`);

  for (const menu of subMenu) {
    menu.addEventListener("mouseenter", function () {
      this.classList.add(`active`);

      for (const noMenu of subMenu) {
        if (noMenu != this) {
          noMenu.classList.remove(`active`);
        }
      }

      bannerBg.classList.add(`active`);

      for (tabContent of tabData) {
        tabContent.classList.remove(`active`);
      }

      const tabBox = this.getAttribute(`data-tab`);
      const changeTab = document.querySelector(`#${tabBox}`);
      changeTab.classList.add(`active`);

      wrapBg.classList.add(`active`);
    });
  }

  for (tabContent of tabData) {
    tabContent.addEventListener(`mouseleave`, function () {
      this.classList.remove(`active`);

      for (const menu of subMenu) {
        menu.classList.remove(`active`);
        bannerBg.classList.remove(`active`);
      }

      wrapBg.classList.remove(`active`);
    });
  }

  const hamBurger = document.querySelector(`#hamburger`);
  const menu = document.querySelector(`.banner .menu`);

  hamBurger.addEventListener(`click`, function () {
    menu.classList.toggle(`click`);
  });

  // 스크롤이벤트
  window.addEventListener(`scroll`, () => {
    const scrollTopData = window.scrollY;
    console.log(scrollTopData);

    const banner = document.querySelector(`.banner_bg`);

    if (scrollTopData >= 450) {
      banner.classList.add(`scroll`);
    } else {
      banner.classList.remove(`scroll`);
    }
  });

  // sec_5 스와이퍼
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1290: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      760: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  // gsap 스크롤트리거 플러그인
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({ markers: false });

  let animationInitialized = false;

  function initScrollAnimation() {
    // 기존 트리거 제거
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    animationInitialized = false;

    // 960 이상일 때만 적용
    if (window.innerWidth > 960) {
      document
        .querySelectorAll(".sec_6 .container")
        .forEach((triggerElement) => {
          const targetElement = triggerElement.querySelector(".video");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: triggerElement,
                start: "top 70%",
                end: "bottom 50%",
                scrub: 1,
              },
            })
            .fromTo(
              targetElement,
              {
                width: "800px",
                height: "900px",
                borderRadius: "15px",
              },
              {
                width: "100vw",
                height: "70vh",
                borderRadius: "0",
                duration: 2,
              }
            );
        });

      animationInitialized = true;
    } else {
      const targetElement = document.querySelector(".video");

      targetElement.style.height = `500px`;
    }
  }

  // 초기 실행
  initScrollAnimation();

  // 리사이즈 시 재적용
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initScrollAnimation();
    }, 200); // debounce 적용
  });
});
