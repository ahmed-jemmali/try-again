import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiLayoutRoutingModule } from './ui-layout-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderToolbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    UiLayoutRoutingModule,
    
  ],
})
export class UiLayoutModule { }
