import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecadeoPage } from './recadeo.page';

const routes: Routes = [
  {
    path: '',
    component: RecadeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecadeoPageRoutingModule {}
