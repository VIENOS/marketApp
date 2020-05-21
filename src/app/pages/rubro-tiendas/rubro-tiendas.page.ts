import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { RubroTiendasService } from 'src/app/services/rubro-tiendas/rubro-tiendas.service';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { ProductoPage } from '../producto/producto.page';
import { CategoriasPage } from '../categorias/categorias.page';
import { CarritoPage } from '../carrito/carrito.page';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-rubro-tiendas',
  templateUrl: './rubro-tiendas.page.html',
  styleUrls: ['./rubro-tiendas.page.scss'],
})
export class RubroTiendasPage implements OnInit {
  public lstsubcategorias:any;
  public idRubroTienda:any;
  public subcategoria:any;
  public idzona:any;
  public verFiltros:any;

  constructor(public _service_rubro_tienda:RubroTiendasService, private router:Router, public viewCtrl: ModalController,private navParams: NavParams,
    public _service_tienda:TiendaService,  public service_carrito:CarritoService) {
  
      this.service_carrito.longCarrito();
    this.idRubroTienda = this.navParams.get('id');
    this.idzona = this.navParams.get('idzona');
    console.log("ID NAME = "+this.idRubroTienda);
    this._service_rubro_tienda.paginax=0;
    this.verFiltros=true;
    
  }

  ngOnInit() {
    this.listSubCategorias(this.idzona,this.idRubroTienda);
 
   
  }

  listSubCategorias(id:any,idzona:any){
    this._service_tienda.getSubCategorias(id,idzona).subscribe(
        res=>{
           this.lstsubcategorias = res;
           if(this.lstsubcategorias.length>0){
              this.subcategoria = this.lstsubcategorias[0];  
              console.log("zona elegida"+JSON.stringify(this.subcategoria));  
              this.cargarTiendas(this.idzona.id,this.idRubroTienda,this.subcategoria.id);
           }else{
             console.log("no hay subcategorias")
             this.subcategoria=0;
             this.cargarTiendas(this.idzona,this.idRubroTienda,this.subcategoria.id);
           }      
        }
    );
  }

  cargarTiendas(idzona:any,idrubro:any,idsubcategoria:any){
    this._service_rubro_tienda.tiendas = [] ;
    this._service_rubro_tienda.getTienda(idzona,idrubro,idsubcategoria);
  }

  cambioSubCategorias(item:any){
    this.subcategoria =item;
    this._service_rubro_tienda.paginax=0;
    console.log("zona elegida"+JSON.stringify(this.subcategoria));
    this.cargarTiendas(this.idzona,this.idRubroTienda,this.subcategoria.id);
    
  }

  siguiente_pagina(infinite){
    this._service_rubro_tienda.getTienda(this.idzona,this.idRubroTienda, this.subcategoria.id).then(()=> {
      infinite.target.complete();
    });
  }


  openTienda(tienda:any){
    console.log("TIENDA = "+tienda.id)
    this.idzona = tienda.zona.id;
    this.idRubroTienda= tienda.nomcategoria;
    this.subcategoria= tienda.subcategoria;
    this.abrirModalProducto(this.idzona,this.idRubroTienda,this.subcategoria.id,tienda.id);
  }


  async abrirModalProducto(idzona,idRubroTienda,idsubcategoria,idtienda){
    const myModal = await this.viewCtrl.create({
      component:CategoriasPage,
      componentProps:{idzona:idzona,idRubroTienda:idRubroTienda,idsubcategoria:idsubcategoria,idtienda:idtienda}});
    await myModal.present();
  }


  cargarTiendasSearch(idzona:any,idrubro:any,term:any){
    this._service_rubro_tienda.paginax=0;
    this._service_rubro_tienda.tiendas = [] ;
    this._service_rubro_tienda.getTiendaSearch(idzona,idrubro,term);
  }

find(ev: any) {
    this.verFiltros=false;
     let valor = ev.target.value;
     console.log(valor);
     this.cargarTiendasSearch(this.idzona,this.idRubroTienda,valor);
     if(valor===""){
       this.cancelFind();
       this.verFiltros=true;
     }
 }

 cancelFind(){
   console.log("CANCELADO")
   this._service_rubro_tienda.paginax=0;
   this._service_rubro_tienda.tiendas = [];
   this._service_rubro_tienda.getTienda(this.idzona,this.idRubroTienda, this.subcategoria.id);
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
