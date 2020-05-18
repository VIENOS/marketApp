import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaTiendaPageRoutingModule } from './mapa-tienda-routing.module';

import { MapaTiendaPage } from './mapa-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaTiendaPageRoutingModule
  ],
  declarations: [MapaTiendaPage]
})
export class MapaTiendaPageModule {}
