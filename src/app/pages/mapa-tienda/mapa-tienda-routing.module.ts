import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaTiendaPage } from './mapa-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: MapaTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaTiendaPageRoutingModule {}
