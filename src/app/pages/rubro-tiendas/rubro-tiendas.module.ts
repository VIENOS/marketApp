import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RubroTiendasPageRoutingModule } from './rubro-tiendas-routing.module';

import { RubroTiendasPage } from './rubro-tiendas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RubroTiendasPageRoutingModule
  ],
  declarations: [RubroTiendasPage]
})
export class RubroTiendasPageModule {}
