document.addEventListener('DOMContentLoaded', () => {
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200; // Lower is faster
    const startCountingWhen = 100; // Pixels from top of viewport

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace('+', '');
      const increment = target / speed;

      const isInView = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight - startCountingWhen);
      };

      const updateCount = () => {
        if (isInView(counter) && count < target) {
          const newCount = Math.ceil(count + increment);
          counter.innerText = newCount < target ? newCount : target;
          if (counter.getAttribute('data-target').includes('+')) {
            counter.innerText += '+';
          }
          setTimeout(updateCount, 1);
        }
      };

      if (isInView(counter)) {
        updateCount();
      }

      window.addEventListener('scroll', () => {
        if (isInView(counter) && count < target) {
          updateCount();
        }
      });
    });
  };

  animateCounters();
});