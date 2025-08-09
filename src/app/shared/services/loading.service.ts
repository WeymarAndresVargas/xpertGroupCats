import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingState = signal(false);

  get loading() {
    return this.loadingState.asReadonly();
  }

  show() {
    this.loadingState.set(true);
  }

  hide() {
    this.loadingState.set(false);
  }
}
