import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PrimeNG Components
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('xpertGroupCats');

  ngOnInit() {
    // Inicialización global si es necesaria
  }
}
