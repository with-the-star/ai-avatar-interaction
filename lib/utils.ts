import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import getConfig from "next/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildUrl(path: string): string {
  const { publicRuntimeConfig = { root: '' } } = getConfig() || {};

  return publicRuntimeConfig.root + path;
}
