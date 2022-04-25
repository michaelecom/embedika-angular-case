import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error setting to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      let data = localStorage.getItem(key);

      return data == null ? null : JSON.parse(data);
    } catch (e) {
      console.error('Error getting from localStorage', e);

      return null;
    }
  }
}
