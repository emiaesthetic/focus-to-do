const timerProgress = document.querySelector('.timer__progress');
const startBtn = document.querySelector('.timer__button');
const duration = 10000;

const radius = getComputedStyle(timerProgress)
  .getPropertyValue('--r')
  .match(/\d+/g)
  .at(0);
const perimeter = 2 * Math.PI * radius;
timerProgress.style.setProperty('--stroke-dasharray', `${perimeter}`);
timerProgress.style.setProperty('--stroke-dashoffset', `${perimeter}`);

const animation = duration => {
  let startTime = NaN;

  requestAnimationFrame(function step(timestamp) {
    startTime ||= timestamp;
    const progress =
      timestamp - startTime > duration ? 1 : (timestamp - startTime) / duration;

    const dashoffset = perimeter * (1 - progress);
    timerProgress.style.setProperty('--stroke-dashoffset', `${dashoffset}`);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  });
};

startBtn.addEventListener('click', () => {
  animation(duration);
});

const ticks = timerProgress.querySelector('#ticks');
const numTicks = 60;

for (let i = 0; i < numTicks; i++) {
  const tick = ticks.firstElementChild.cloneNode();
  tick.setAttribute(
    'transform',
    `rotate(${i * (360 / numTicks)} 120 120) translate(0, 220)`,
  );
  timerProgress.appendChild(tick);
}

ticks.firstElementChild.remove();
