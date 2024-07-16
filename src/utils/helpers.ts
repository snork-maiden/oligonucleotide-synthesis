export function secondsLeftToString(s: number) {
    let now = new Date();
    const endTime = new Date(now.getTime() + s * 1000);
    return endTime.toLocaleTimeString();
  }