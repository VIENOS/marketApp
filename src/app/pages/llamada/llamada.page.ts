import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/interfaces';
import { ProductoPage } from '../producto/producto.page';
import { ModalController } from '@ionic/angular';
import { LlamadaService } from 'src/app/services/llamada/llamada.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
@Component({
  selector: 'app-llamada',
  templateUrl: './llamada.page.html',
  styleUrls: ['./llamada.page.scss'],
})
export class LlamadaPage implements OnInit {

  constructor(public _service:LlamadaService,public viewCtrl: ModalController) {
    this._service.lstofertas = [];
   }


  ngOnInit() {
    this._service.getOfertas();
  }


  openProducto(producto:any){

    console.log("PRODUCTO = "+producto.id)
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
  
}
