import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaPageRoutingModule } from './tienda-routing.module';

import { TiendaPage } from './tienda.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { TiendaDetallePageModule } from '../tienda-detalle/tienda-detalle.module';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoPageModule } from '../carrito/carrito.module';

@NgModule({
  entryComponents:[
    TiendaDetallePage,
    CarritoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TiendaPageRoutingModule,
    TiendaDetallePageModule,
    CarritoPageModule
  ],
  declarations: [TiendaPage]
})
export class TiendaPageModule {}
