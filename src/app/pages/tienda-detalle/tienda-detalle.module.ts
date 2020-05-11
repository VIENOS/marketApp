import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaDetallePageRoutingModule } from './tienda-detalle-routing.module';

import { TiendaDetallePage } from './tienda-detalle.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CategoriasPage } from '../categorias/categorias.page';
import { CategoriasPageModule } from '../categorias/categorias.module';

@NgModule({
  entryComponents:[
    CategoriasPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    CategoriasPageModule,
    TiendaDetallePageRoutingModule
  ],
  declarations: [TiendaDetallePage]
})
export class TiendaDetallePageModule {}
