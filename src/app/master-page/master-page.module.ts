import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { AngularMaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class MasterPageModule { }
