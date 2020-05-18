import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';
import { CesionPage } from '../cesion/cesion.page';
import { CesionPageModule } from '../cesion/cesion.module';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';
import { MapaTiendaPage } from '../mapa-tienda/mapa-tienda.page';
import { MapaTiendaPageModule } from '../mapa-tienda/mapa-tienda.module';

@NgModule({
  entryComponents:[
    CesionPage,
    MapaTiendaPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    CesionPageModule,
    MapaTiendaPageModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
