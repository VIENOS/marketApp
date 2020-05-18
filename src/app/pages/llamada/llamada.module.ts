import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlamadaPageRoutingModule } from './llamada-routing.module';

import { LlamadaPage } from './llamada.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductoPage } from '../producto/producto.page';
import { ProductoPageModule } from '../producto/producto.module';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoPageModule } from '../carrito/carrito.module';

@NgModule({
  entryComponents:[
    ProductoPage,
    CarritoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    LlamadaPageRoutingModule,
    ProductoPageModule,
    CarritoPageModule
  ],
  declarations: [LlamadaPage]
})
export class LlamadaPageModule {}
