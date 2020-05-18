import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecadeoPageRoutingModule } from './recadeo-routing.module';

import { RecadeoPage } from './recadeo.page';
import { CesionPageModule } from '../cesion/cesion.module';
import { CesionPage } from '../cesion/cesion.page';
import { MapaPage } from '../mapa/mapa.page';
import { MapaPageModule } from '../mapa/mapa.module';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoPageModule } from '../carrito/carrito.module';

@NgModule({
  entryComponents:[
    CesionPage,
    MapaPage,
    CarritoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecadeoPageRoutingModule,
    CesionPageModule,
    MapaPageModule,
    CarritoPageModule 
  ],
  declarations: [RecadeoPage]
})
export class RecadeoPageModule {}
