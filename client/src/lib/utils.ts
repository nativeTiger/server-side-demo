import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @param {Function} func
 * @param {number} delay
 * @param {{ leading?: boolean }} options
 */
export function debounce(
  // eslint-disable-next-line @typescript-eslint/ban-types
  func: Function,
  delay: number,
  { leading }: { leading?: boolean } = {}
) {
  let timerId: number | null;

  return (...args: unknown[]) => {
    if (!timerId && leading) {
      func(...args);
    }
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => func(...args), delay);
  };
}
