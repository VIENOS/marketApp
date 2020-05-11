import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosPageRoutingModule } from './contactos-routing.module';

import { ContactosPage } from './contactos.page';
import { ContactoDetallePageModule } from '../contacto-detalle/contacto-detalle.module';


@NgModule({
  entryComponents:[
    ContactosPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosPageRoutingModule,
    ReactiveFormsModule,
    ContactoDetallePageModule
  ],
  declarations: [ContactosPage]
})
export class ContactosPageModule {}
