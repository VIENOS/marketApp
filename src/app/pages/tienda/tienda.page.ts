import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
import { RubroTiendasService } from 'src/app/services/rubro-tiendas/rubro-tiendas.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  public lstzonas:any;
  public lstsugeridos:any;
  public zona:any;
  public sugerido:any;
  constructor(public _service_tienda:TiendaService, public viewCtrl: ModalController,public _service_rubrostienda:RubroTiendasService,
      public service_carrito:CarritoService) {
  
    this.service_carrito.longCarrito();
    this._service_tienda.tiendas = [];
   }

  ngOnInit() {
 
    this.listsugeridos();
  }
  //this._service_rubro_tienda.paginax=0;

  listsugeridos(){
    this._service_tienda.getSubCategoriasSugeridos().subscribe(
        res=>{
           this.lstsugeridos = res;
           this.sugerido = this.lstsugeridos.length>0 ? this.lstsugeridos[0]:undefined; 
           this.cargarTiendas(this.sugerido.id);
        }
    );
  }

  cargarTiendas(idsubcategoria:any){
    this._service_tienda.tiendas = [] ;
    this._service_tienda.getTienda(idsubcategoria);
  }

  cambioSubCategorias(item:any){
    this.sugerido =item;
    this._service_tienda.pagina=0;
    console.log("cateogria elegida"+JSON.stringify(this.sugerido));
    this.cargarTiendas(this.sugerido.id);
    
  }

  onClick(id:any){

  }

  siguiente_pagina(infinite){
    this._service_tienda.getTienda(this.sugerido.id).then(()=> {
      infinite.target.complete();
    });
  }


  openTienda(tienda:any){
    console.log("TIENDA = "+tienda.id)
    this.abrirModal(tienda.id);
  }


  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:TiendaDetallePage,
      componentProps:{id:ids}});
    await myModal.present();
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
