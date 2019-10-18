import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '../material/material.module';
import { MasterPageRoutingModule } from './master-page-routing.module';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    CommonModule,
    MasterPageRoutingModule,
    AngularMaterialModule
  ]
})
export class MasterPageModule { }
