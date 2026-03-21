import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDuration(sec: number) {
  const hourNum = Math.floor(sec / 3600);
  const minNum = Math.floor((sec % 3600) / 60);
  const secondNum = sec % 60;

  const hours = hourNum < 10 ? `0${hourNum}` : hourNum;
  const minutes = minNum < 10 ? `0${minNum}` : minNum;
  const seconds = secondNum < 10 ? `0${secondNum}` : secondNum;

  return `${hours}:${minutes}:${seconds}`;
}
