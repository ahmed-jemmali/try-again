import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalRoutingModule } from './global-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { UiComponentsModule } from '@project/ui/components/ui-components.module';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    GlobalRoutingModule,
    UiComponentsModule
  ]
})
export class GlobalModule { }
