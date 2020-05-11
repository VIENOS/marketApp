import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RubroTiendasPage } from './rubro-tiendas.page';

const routes: Routes = [
  {
    path: '',
    component: RubroTiendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RubroTiendasPageRoutingModule {}
