import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// import { existsSync } from 'fs';
import { join } from 'path';

export function buildSafeImageUrl(filename: string): string {
  const fullPath = join(process.cwd(), 'public', 'images', 'products', filename);

  if (fullPath) {
    return `/images/products/${filename}`;
  }

  return '/images/products/default.jpg';
}

