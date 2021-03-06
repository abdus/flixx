export const debounce = (() => {
  const ONE_SEC = 1000;
  let debounceTimer: ReturnType<typeof setTimeout>;

  return function __debounce_func(
    func: Function,
    timer?: number
  ): ReturnType<typeof setTimeout> {
    // debouncer invokes a function after all the calls are made for a specific
    // time.. say, 1s
    // so the logic here is, to put a timer. and if someone calls the debouncer
    // before the timer runs out, clear the previous timer and set a new timer

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      func.apply(undefined, arguments);
    }, timer || ONE_SEC);

    return debounceTimer;
  };
})();

export function shuffleArray(arr: any[]): any[] {
  for (let i = 0; i < arr.length; i++) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
}

export function beautifyDate(date: Date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}
