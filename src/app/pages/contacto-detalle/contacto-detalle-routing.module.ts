import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoDetallePage } from './contacto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoDetallePageRoutingModule {}
