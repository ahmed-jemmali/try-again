import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'global', pathMatch: 'full' },
      {
        path: 'global',
        loadChildren: () =>
          import('@project/pages/global/global.module').then(
            (m) => m.GlobalModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiLayoutRoutingModule {}
