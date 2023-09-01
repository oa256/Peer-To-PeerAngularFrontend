import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenExpiredService {

  constructor() { }
  private isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  isOpened() {
    return this.isOpen;
  }
}
