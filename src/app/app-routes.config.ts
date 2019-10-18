import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'master-page',
    loadChildren: () => import('./master-page/master-page.module').then(m => m.MasterPageModule)
  },
  {
    path: '',
    redirectTo: 'master-page/map',
    pathMatch: 'full'
  }
];
