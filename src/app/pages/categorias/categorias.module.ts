import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasPageRoutingModule } from './categorias-routing.module';

import { CategoriasPage } from './categorias.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductoPage } from '../producto/producto.page';
import { ProductoPageModule } from '../producto/producto.module';

@NgModule({
  entryComponents:[
    ProductoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CategoriasPageRoutingModule,
    ProductoPageModule
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
