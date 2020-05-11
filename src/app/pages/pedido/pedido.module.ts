import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { PedidoPage } from './pedido.page';
import { CesionPage } from '../cesion/cesion.page';
import { CesionPageModule } from '../cesion/cesion.module';

@NgModule({
  entryComponents:[
    CesionPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    CesionPageModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
