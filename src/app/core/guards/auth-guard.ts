import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Guard de autenticación que verifica si el usuario está logeado
 * Si el usuario no está autenticado, redirige a la pantalla de login
 */
export const authGuard: CanActivateFn = ( route, state ) => {
  const router = inject( Router );
  const authService = inject( AuthService );

  if( authService.isAuthenticated() ) {
    return true;
  }
  return router.createUrlTree( [ '/login' ] );
};
