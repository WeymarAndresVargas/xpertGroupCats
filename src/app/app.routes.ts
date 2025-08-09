import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'cats', pathMatch: 'full'
  }, {
    path: 'cats', loadComponent: () => import('./features/cats/cats').then( c => c.Cats ), canActivate: [ authGuard ]
  }, {
    path: 'cats-list',
    loadComponent: () => import('./features/cats/table-cats/table-cats').then( c => c.TableCats ),
    canActivate: [ authGuard ]
  }, {
    path: 'login', loadChildren: () => import('./features/auth/auth.routes').then( m => m.AUTH_ROUTES )
  }


];
