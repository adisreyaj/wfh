import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem<T = unknown>(key: string): T | undefined {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }
  setItem<T = unknown>(key: string, value: T): void {
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
