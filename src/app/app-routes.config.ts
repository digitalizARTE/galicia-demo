import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'master-page',
  //   loadChildren: () => import('./master-page/master-page.module').then(m => m.MasterPageModule)
  // },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then(m => m.MapModule)
  },
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  }
];
