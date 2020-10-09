let timer: number | null = null;

interface DebounceArgs {
  callback(): void;
  delay: number;
}

const debounce = ({ callback, delay }: DebounceArgs): any => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    callback();
    timer = null;
  }, delay);
};

export { debounce };
