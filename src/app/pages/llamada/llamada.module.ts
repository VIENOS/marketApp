import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlamadaPageRoutingModule } from './llamada-routing.module';

import { LlamadaPage } from './llamada.page';
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
    PipesModule,
    IonicModule,
    LlamadaPageRoutingModule,
    ProductoPageModule
  ],
  declarations: [LlamadaPage]
})
export class LlamadaPageModule {}
