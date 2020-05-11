import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaDetallePage } from './tienda-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaDetallePageRoutingModule {}
