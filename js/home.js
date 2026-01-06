// home.js（獨立：不碰 cart.js / checkout.js）
(() => {
    const root = document.getElementById('promoCarousel');
    const track = document.getElementById('promoTrack');
    if (!root || !track) return;
  
    const slides = Array.from(track.querySelectorAll('.promo-slide'));
    const dots = Array.from(root.querySelectorAll('[data-dot]'));
    const prev = document.getElementById('promoPrev');
    const next = document.getElementById('promoNext');
  
    let index = 0;
    let timer = null;
    const INTERVAL = 5500;
  
    const setActive = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
  
      dots.forEach((d, k) => d.classList.toggle('is-active', k === index));
    };
  
    const play = () => {
      stop();
      timer = setInterval(() => setActive(index + 1), INTERVAL);
    };
  
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
  
    prev?.addEventListener('click', () => { setActive(index - 1); play(); });
    next?.addEventListener('click', () => { setActive(index + 1); play(); });
  
    dots.forEach((d) => {
      d.addEventListener('click', () => {
        const i = Number(d.getAttribute('data-dot'));
        setActive(i);
        play();
      });
    });
  
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
  
    setActive(0);
    play();
  })();
  