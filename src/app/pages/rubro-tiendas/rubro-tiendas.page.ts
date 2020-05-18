import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { RubroTiendasService } from 'src/app/services/rubro-tiendas/rubro-tiendas.service';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { ProductoPage } from '../producto/producto.page';
import { CategoriasPage } from '../categorias/categorias.page';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-rubro-tiendas',
  templateUrl: './rubro-tiendas.page.html',
  styleUrls: ['./rubro-tiendas.page.scss'],
})
export class RubroTiendasPage implements OnInit {

  public idRubroTienda:any;
  
  constructor(public _service_rubro_tienda:RubroTiendasService, private router:Router, public viewCtrl: ModalController,private navParams: NavParams) { 
    this.idRubroTienda = this.navParams.get('id');
    console.log("ID = "+this.idRubroTienda);
    this._service_rubro_tienda.paginax=0;
  }

  ngOnInit() {
    this._service_rubro_tienda.tiendas = [] ;
   this._service_rubro_tienda.getTienda(this.idRubroTienda);
  }

  siguiente_pagina(infinite){
    this._service_rubro_tienda.getTienda(this.idRubroTienda).then(()=> {
      infinite.target.complete();
    });
  }


  openTienda(tienda:any){
    console.log("TIENDA = "+tienda.id)
    this.abrirModalProducto(tienda.id);
  }


  async abrirModalProducto(ids){
    const myModal = await this.viewCtrl.create({
      component:CategoriasPage,
      componentProps:{id:ids}});
    await myModal.present();
  }



  find(ev: any) {
    let valor = ev.target.value;
     console.log(valor);
 }

 cancelFind(){
  this._service_rubro_tienda.tiendas = [];
  this._service_rubro_tienda.getTienda(this.idRubroTienda);
}

close(){
  this.viewCtrl.dismiss();
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
