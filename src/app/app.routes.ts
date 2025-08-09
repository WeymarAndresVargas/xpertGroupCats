import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'cats', pathMatch: 'full'
  }, {
    path: 'cats', loadComponent: () => import('./features/cats/cats').then( c => c.Cats )
  }, {
    path: 'cats-list', loadComponent: () => import('./features/cats/table-cats/table-cats').then( c => c.TableCats )
  },

];
