import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MasterPageComponent } from '../master-page/master-page.component';
import { MasterPageModule } from '../master-page/master-page.module';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [MasterPageModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingMapRoutingModule { }
