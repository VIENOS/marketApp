import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductoPage } from '../producto/producto.page';
import { ProductoPageModule } from '../producto/producto.module';
import { CategoriasPage } from '../categorias/categorias.page';
import { CategoriasPageModule } from '../categorias/categorias.module';
import { RubroTiendasPageModule } from '../rubro-tiendas/rubro-tiendas.module';
import { RubroTiendasPage } from '../rubro-tiendas/rubro-tiendas.page';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { TiendaDetallePageModule } from '../tienda-detalle/tienda-detalle.module';

@NgModule({
  entryComponents:[
    ProductoPage,
    CategoriasPage,
    RubroTiendasPage,
    TiendaDetallePage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    InicioPageRoutingModule,
    ProductoPageModule,
    CategoriasPageModule,
    RubroTiendasPageModule,
    TiendaDetallePageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
