import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CesionPage } from './cesion.page';

const routes: Routes = [
  {
    path: '',
    component: CesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CesionPageRoutingModule {}
