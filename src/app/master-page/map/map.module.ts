import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingMapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { AngularMaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    TrackingMapRoutingModule,
    AngularMaterialModule
  ],
  providers: []
})
export class MapModule { }
