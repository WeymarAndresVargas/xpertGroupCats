import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-text">Cargando</div>
        <div class="dots-loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(106, 17, 203, 0.9) 0%, rgba(37, 117, 252, 0.9) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .loading-text {
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: bold;
      background: linear-gradient(to right, #ff8a00, #da1b60, #8823eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      padding: 10px 20px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .dots-loader {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }

    .dots-loader .dot {
      width: 15px;
      height: 15px;
      margin: 0 5px;
      border-radius: 50%;
      animation: dot-pulse 1.5s ease-in-out infinite;
    }

    .dots-loader .dot:nth-child(1) {
      background-color: #ff8a00;
      animation-delay: 0s;
    }

    .dots-loader .dot:nth-child(2) {
      background-color: #da1b60;
      animation-delay: 0.2s;
    }

    .dots-loader .dot:nth-child(3) {
      background-color: #8823eb;
      animation-delay: 0.4s;
    }

    @keyframes dot-pulse {
      0%, 100% {
        transform: scale(0.8);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  `]
})
export class LoadingComponent {
  @Input() isLoading = false;
}
