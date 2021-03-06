import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const MODULES = [
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  FlexLayoutModule,
  FormsModule,
  MatSidenavModule,
  ReactiveFormsModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  ScrollDispatchModule,
  MatCheckboxModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatSelectModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES
})
export class AngularMaterialModule { }
