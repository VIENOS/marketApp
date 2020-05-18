import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosPageRoutingModule } from './contactos-routing.module';

import { ContactosPage } from './contactos.page';
import { ContactoDetallePageModule } from '../contacto-detalle/contacto-detalle.module';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoPageModule } from '../carrito/carrito.module';


@NgModule({
  entryComponents:[
    ContactosPage,
    CarritoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosPageRoutingModule,
    ReactiveFormsModule,
    ContactoDetallePageModule,
    CarritoPageModule
  ],
  declarations: [ContactosPage]
})
export class ContactosPageModule {}
