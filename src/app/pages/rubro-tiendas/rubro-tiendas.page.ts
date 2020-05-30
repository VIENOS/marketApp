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
  public valor : any;

  constructor(public _service_rubro_tienda:RubroTiendasService, private router:Router, public viewCtrl: ModalController,
    private navParams: NavParams,
    public _service_tienda:TiendaService,  public service_carrito:CarritoService) {
  
      this.service_carrito.longCarrito();
   
    
  }

  ngOnInit() {
    this.idRubroTienda = this.navParams.get('id');
    this.idzona = this.navParams.get('idzona');
    console.log("ID categoria = "+this.idRubroTienda);
    console.log("ID ZONA = "+this.idzona);
    this._service_rubro_tienda.paginax=0;
    this.verFiltros=true;
    this.listSubCategorias(this.idRubroTienda,this.idzona);
 
   
  }

  listSubCategorias(id:any,idzona:any){
    this._service_tienda.getSubCategorias(id,idzona).subscribe(
        res=>{
           this.lstsubcategorias = res;
           if(this.lstsubcategorias.length>0){
              this.subcategoria = this.lstsubcategorias[0];  
              console.log("zona elegida"+JSON.stringify(this.subcategoria));  
              this.cargarTiendas(this.idzona,this.idRubroTienda,this.subcategoria.id);
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
    if(this.valor==="" || this.valor===undefined){
      console.log(" NEXT")
      this._service_rubro_tienda.getTienda(this.idzona,this.idRubroTienda, this.subcategoria.id).then(()=> {
        infinite.target.complete();
      });
    }else{
      console.log("SEARCH NEXT ")
     
    }
  
  }


  openTienda(tienda:any){
    console.log("TIENDA = "+tienda.id)
    this.idzona = tienda.zona.id;
    this.idRubroTienda= this.idRubroTienda;
    this.subcategoria= tienda.subcategoria;
    this.abrirModalProducto(this.idzona,this.idRubroTienda,this.subcategoria.id,tienda.id);
  }


  async abrirModalProducto(idzona,idRubroTienda,idsubcategoria,idtienda){
    const myModal = await this.viewCtrl.create({
      component:CategoriasPage,
      componentProps:{idzona:idzona,idRubroTienda:idRubroTienda,idsubcategoria:idsubcategoria,idtienda:idtienda}});
    await myModal.present();
    const {data} = await myModal.onDidDismiss();
    console.log("SOLO ES BANDERA = ")
    this._service_rubro_tienda.paginax=0;
    this._service_rubro_tienda.tiendas = [] ;
    this.listSubCategorias(this.idRubroTienda,this.idzona);
  
  }


  cargarTiendasSearch(idzona:any,idrubro:any,term:any){
    this._service_rubro_tienda.paginax=0;
    this._service_rubro_tienda.tiendas = [] ;
    this._service_rubro_tienda.getTiendaSearch(idzona,idrubro,term);
  }

find(ev: any) {
  this.valor = ev.target.value;
  if(this.valor==="" || this.valor===undefined){
    this.verFiltros=true;
     this.cancelFind();
     
   }else{
    this.verFiltros=false;
  
    console.log(this.valor);
    this.cargarTiendasSearch(this.idzona,this.idRubroTienda,this.valor);
   }
  
  
 }

 cancelFind(){
   console.log("CANCELADO")
   this._service_rubro_tienda.paginax=0;
   this._service_rubro_tienda.tiendas = [];
   this.cargarTiendas(this.idzona,this.idRubroTienda,this.subcategoria.id);
   
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
