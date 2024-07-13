export function createTimer(
  duration: number,
  onTick: (secondsLeft: number) => void,
  onComplete: () => void
) {
  let countStop: any;

  function setTimer() {
    clearInterval(countStop);
    const start = Date.now();
    const end = new Date(start + duration * 1000);

    function setCountdown() {
      const msLeft = new Date(Math.round((+end - Date.now()) / 1000) * 1000);
      const secondsLeft = +msLeft / 1000;

      if (secondsLeft < 0) {
        clearInterval(countStop);
        onComplete();
        return;
      }

      onTick(secondsLeft);

      if (secondsLeft === 0) {
        clearInterval(countStop);
        onComplete();
      }
    }

    setCountdown();
    countStop = setInterval(setCountdown, 1000);
  }

  setTimer();
}
