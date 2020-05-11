import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CesionPageRoutingModule } from './cesion-routing.module';

import { CesionPage } from './cesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CesionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CesionPage]
})
export class CesionPageModule {}
