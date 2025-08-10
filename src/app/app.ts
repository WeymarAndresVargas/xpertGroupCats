import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { AuthService } from './services/auth.service';

@Component( {
  selector: 'app-root', standalone: true, imports: [
    CommonModule, RouterOutlet, ToastModule, ToolbarModule, ButtonModule, AvatarModule, MenuModule, TieredMenuModule
  ], providers: [ MessageService ], templateUrl: './app.html', styleUrl: './app.scss'
} )
export class App implements OnInit {

  protected userMenuItems: MenuItem[] = [];
  private authService = inject( AuthService );
  private router = inject( Router );
  private messageService = inject( MessageService );

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userInitial(): string {
    return this.currentUser?.name?.charAt( 0 ).toUpperCase() || 'U';
  }

  ngOnInit() {
    this.initMenuItems();
  }


  /**
   * Inicializa los elementos del menú de usuario y navegación
   */
  initMenuItems() {
    this.userMenuItems = [
      {
        label: 'Cerrar sesión', icon: 'pi pi-power-off', command: () => this.logout()
      }
    ];
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    this.authService.logout();
    this.messageService.add( {
      severity: 'success', summary: 'Sesión cerrada', detail: 'Has cerrado sesión correctamente'
    } );
    this.router.navigate( [ '/login' ] );
  }

  /**
   * Navega a la vista de tabla de gatos
   */
  navigateToCatsList() {
    this.router.navigate( [ '/cats-list' ] );
  }

  /**
   * Navega a la vista principal de gatos
   */
  navigateToHome() {
    this.router.navigate( [ '/cats' ] );
  }

}
