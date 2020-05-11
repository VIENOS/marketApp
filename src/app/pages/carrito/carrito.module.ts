import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PedidoPage } from '../pedido/pedido.page';
import { PedidoPageModule } from '../pedido/pedido.module';

@NgModule({
  entryComponents:[
    PedidoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    CarritoPageRoutingModule,
    PedidoPageModule
  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule {}
