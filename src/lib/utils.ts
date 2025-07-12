import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || 'https://exim-backend-s5lf.onrender.com';
}

export function getFullUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    return getApiBaseUrl() + path;
  }
  if (path.startsWith('/api')) {
    return getApiBaseUrl() + path.replace(/^\/api/, '/api');
  }
  // If it's just a filename (no leading slash), treat as upload
  if (!path.startsWith('/')) {
    return getApiBaseUrl() + '/uploads/' + path;
  }
  return path;
}
