import { Component, OnInit } from '@angular/core';
import { Producto, ProductoCont } from 'src/app/interfaces/interfaces';
import { ProductoPage } from '../producto/producto.page';
import { ModalController, ToastController } from '@ionic/angular';
import { LlamadaService } from 'src/app/services/llamada/llamada.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
@Component({
  selector: 'app-llamada',
  templateUrl: './llamada.page.html',
  styleUrls: ['./llamada.page.scss'],
})
export class LlamadaPage implements OnInit {

  constructor(public _service:LlamadaService,public viewCtrl: ModalController,public toastController: ToastController,
    public service_carrito:CarritoService) {
  
    this.service_carrito.longCarrito();
    //this._service.lstofertas = [];
   }


  ngOnInit() {
     this._service.getOfertas();
  }


  openProducto(producto:any){

    console.log("PRODUCTO = "+producto.id);
    this.abrirModal(producto.id);
  }


  

  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:ProductoPage,
      componentProps:{id:ids}});
    await myModal.present();
  }


  siguiente_pagina(event){
     this._service.getOfertas().then(()=> {
         event.target.complete();
    });
  }

  
  openCarrito(){
    this.abrirModalCarrito();
  }
  
  
  async abrirModalCarrito(){
    const myModal = await this.viewCtrl.create({
      component:CarritoPage
      });
    await myModal.present();
  }
  

   guardarCarrito(pruducto:any){
     let item = new ProductoCont();
     var idProductoString = pruducto.id;
     var idProductoNumber: number = +idProductoString;

     var precioString = pruducto.precio;
     var precioNumber: number = +precioString;

     var ofertaString = pruducto.oferta;
     var ofertaNumber: number = +ofertaString;

     pruducto.id = idProductoNumber;
     pruducto.precio = precioNumber;
     pruducto.oferta = ofertaNumber;

     console.log("tipo id oferta:: " + typeof(pruducto.id));
     console.log("tipo precio:: " + typeof(pruducto.precio));
     console.log("tipo oferta:: " + typeof(pruducto.oferta));

     item.producto = pruducto;
     item.cantidad = 1;
      this.service_carrito.guardarCarrito(item);   
     //this.succesCarrito();
  }




}
