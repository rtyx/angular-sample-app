import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentDatePipe } from './recent-date.pipe';

@NgModule({
  declarations: [
    RecentDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecentDatePipe
  ]
})
export class CustomPipesModule {
}
