const timerProgress = document.querySelector('.timer__progress');
const startBtn = document.querySelector('.timer__button');
const duration = 10000;

const animation = duration => {
  let startTime = NaN;

  requestAnimationFrame(function step(timestamp) {
    startTime ||= timestamp;
    const progress =
      timestamp - startTime > duration ? 1 : (timestamp - startTime) / duration;
    console.log(progress);

    const angle = progress * 360;
    timerProgress.style.setProperty('--angle', `${angle}deg`);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  });
};

startBtn.addEventListener('click', () => {
  animation(duration);
});
