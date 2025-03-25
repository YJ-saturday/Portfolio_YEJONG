document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  // Splitting 호출 함수
  function initSplitting() {
    Splitting();
  }

  // header 영역 스크롤 방향 이벤트 함수
  function initHeaderScroll() {
    var prevScrollTop = 0;
    document.addEventListener("scroll", function () {
      var nowScrollTop = $(window).scrollTop();

      if (nowScrollTop > prevScrollTop) {
        $('header').addClass('active');
      } else {
        $('header').removeClass('active');
      }
      prevScrollTop = nowScrollTop;
    });
  }

  const images = ["./images/ppunsig1.png", "./images/ppunsig2.png"];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("changingImage").src = images[index];
  }, 1000);


  // scrolla 초기화 함수
  function initScrolla() {
    $('.animate').scrolla({
      mobile: true,
      once: false
    });
  }

  // .con01 GSAP 애니메이션 함수
  function Con01() {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.con01',
        start: '0% 80%',
        end: '100% 100%',
        scrub: 1,
        // markers: true
      }
    })
      .to('.wrap', { backgroundColor: '#fff', color: '#000', ease: 'none', duration: 5 }, 0)
      .to('.scroll', { opacity: '0', ease: 'none', duration: 5 }, 0)
      .fromTo('.videoWrap video',
        { 'clip-path': 'inset(60% 60% 60% 60% round 30%)' },
        { 'clip-path': 'inset(0% 0% 0% 0% round 0%)', ease: 'none', duration: 10 }, 0);
  }

  // .con02 타이틀 GSAP 애니메이션 함수
  function Con02Title() {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".con02",
        start: '0% 100%',
        end: '0% 20%',
        scrub: 1,
        // markers: true
      }
    })
      .fromTo('.con02 .titleAbout .a', { x: '-100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
      .fromTo('.con02 .titleAbout .b', { x: '100%' }, { x: '0%', ease: 'none', duration: 5 }, 0);
  }

  // about 영역 GSAP 애니메이션 함수
  function Con02About() {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.about',
        start: '0% 100%',
        end: '0% 100%',
        scrub: 1,
        // markers: true
      }
    })
      .to('.wrap', { backgroundColor: '#000', color: '#fff', ease: 'none', duration: 5 }, 0)
      .to('.con02 .titleAbout', {
        position: 'fixed', ease: 'none', left: '0', top: '0', width: '100%', duration: 5
      }, 0)
      .fromTo('.about', { margin: '0 auto' }, { margin: '100vh auto 0', position: 'relative', zIndex: '10', duration: 1 }, 0);
  }

  // about 종료 시 타이틀 fade out GSAP 애니메이션 함수
  function Con02TextWrap() {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.textWrap',
        start: '0% 100%',
        end: '0% 50%',
        scrub: 1,
        // markers: true
      }
    })
      .to('.con02 .titleAbout .a', { opacity: 0 }, 0)
      .to('.con02 .titleAbout .b', { opacity: 0 }, 0);
  }

  // simplyScroll 초기화 함수
  function initSimplyScroll() {
    $(".Skill .list").simplyScroll({
      speed: 4,
      pauseOnHover: false,
      pauseOnTouch: false
    });
  }

  function Con03Title() {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".titlePort",
        start: '80% 100%',
        end: '0% 20%',
        scrub: 1,
        // markers: true
      }
    })
      .fromTo('.con03 .titlePort .a', { x: '-100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
      .fromTo('.con03 .titlePort .b', { x: '100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
  }

  function Con03Port() {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.con03',
        start: '0% 30%',
        end: '0% 30%',
        scrub: 1,
        // markers: true
      }
    })
      .to('.con03 .titlePort', {
        position: 'fixed', ease: 'none', left: '0', top: '0', width: '100%', duration: 5
      }, 0);
  }

  function Con03Port2() {

    gsap.timeline({
      scrollTrigger: {
        trigger: '.project',
        start: '40% 50%',
        end: '50% 30%',
        scrub: 1,
        // markers: true
      }
    })
      .to('.con03 .titlePort .a', { x: '-100%', ease: 'none', duration: 5 }, 0)
      .to('.con03 .titlePort .b', { x: '100%', ease: 'none', duration: 5 }, 0)
  }



  $(function () {
    initSplitting();
    initHeaderScroll();
    initScrolla();
    Con01();
    Con02Title();
    Con02About();
    Con02TextWrap();
    initSimplyScroll();
    Con03Title();
    Con03Port();
    Con03Port2();
  });


  gsap.registerPlugin(ScrollTrigger);

  let activeImage;

  gsap.utils.toArray('.con03 .inner ul li a').forEach((elem) => {
    let image = elem.querySelector('.fadeImg'),
      align = (e) => {
        setX(e.clientX);
        setY(e.clientY);
      },
      startPoint = () => document.addEventListener('mousemove', align),
      stopPoint = () => document.removeEventListener('mousemove', align),
      fade = gsap.to(image, { autoAlpha: 0.8, ease: 'none', paused: true });

    elem.addEventListener('mouseenter', (e) => {
      fade.play();
      startPoint();
      if (activeImage) {
        gsap.set(image, {
          x: gsap.getProperty(activeImage, 'x'),
          y: gsap.getProperty(activeImage, 'y'),
        });
      }
      activeImage = image;
      (setX = gsap.quickTo(image, 'x', { duration: 0.5, ease: Elastic })),
        (setY = gsap.quickTo(image, 'y', { duration: 0.5, ease: Elastic }));
      align(e);
    });
    elem.addEventListener('mouseleave', () => fade.reverse());
  });

});