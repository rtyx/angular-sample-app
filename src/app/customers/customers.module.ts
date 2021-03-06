import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomPipesModule } from '../_core/pipes/custom-pipes.module';
import { HeaderComponent } from './header/header.component';
import { ProjectsDialogComponent } from './projects-dialog/projects-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [CustomersComponent, HeaderComponent, ProjectsDialogComponent],
  entryComponents: [ProjectsDialogComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CustomPipesModule,
    MatProgressSpinnerModule
  ]
})
export class CustomersModule {
}
