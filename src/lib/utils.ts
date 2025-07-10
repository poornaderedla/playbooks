import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
}

export function getFullUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // If path starts with /uploads, use the API base URL
  if (path.startsWith('/uploads')) {
    return getApiBaseUrl() + path;
  }
  // If path starts with /api, use the API base URL
  if (path.startsWith('/api')) {
    return getApiBaseUrl() + path.replace(/^\/api/, '/api');
  }
  // Otherwise, treat as static asset
  return path.startsWith('/') ? path : `/${path}`;
}
