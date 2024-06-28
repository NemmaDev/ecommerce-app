import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  storeCartData(data: any): void {
    try {
      const cartData = JSON.stringify(data);
      localStorage.setItem('cart-data', cartData);
    } catch (e) {
      console.error('Error storing data in localStorage:', e);
    }
  }

  getCartData(): any[] {
    try {
      const getData = localStorage.getItem('cart-data');
      return getData ? JSON.parse(getData) : [];
    } catch (e) {
      console.error('Error retrieving data from localStorage:', e);
      return [];
    }
  }
}
