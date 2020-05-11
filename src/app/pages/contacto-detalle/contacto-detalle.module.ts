import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoDetallePageRoutingModule } from './contacto-detalle-routing.module';

import { ContactoDetallePage } from './contacto-detalle.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    ContactoDetallePageRoutingModule
  ],
  declarations: [ContactoDetallePage]
})
export class ContactoDetallePageModule {}
