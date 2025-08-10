import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../intefaces/user';
import { AuthStore } from '../core/state/auth.state';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  authState = inject( AuthStore );

  /**
   * Verifica si el usuario está actualmente autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated();
  }

  /**
   * Obtiene la información del usuario actual
   * @returns Información del usuario o null si no está autenticado
   */
  getCurrentUser(): IUser | null {
    return this.authState.user();
  }

  /**
   * Cierra la sesión del usuario actual
   * @returns Observable que completa cuando se ha cerrado la sesión
   */
  logout(): void {
    this.authState.logout();
  }

  /**
   * Autentica a un usuario con el correo electrónico y contraseña proporcionados.
   *
   * @param {string} email - El correo electrónico del usuario que intenta iniciar sesión.
   * @param {string} password - La contraseña del usuario que intenta iniciar sesión.
   * @return {Observable<{ user: IUser | null }>} Un observable que contiene la información del usuario si la autenticación es exitosa, o null si falla.
   */
  login( email: string, password: string ): Observable<{ user: IUser | null }> {
    const user = {
      name: 'Usuario 1', token: '$2a$12$t.zFGlMUUrWMnqXnJt2gbOnGHRMmNaB81BvCbtFkuiZ.26QB7PYS2', email: email
    };
    if( email === 'correo@correo.com' && password === 'Admin123' ) {
      this.authState.login( user );
      return of( {
        user
      } );
    } else {
      return of( { user: null } );
    }
  }

}
