import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { TiendaDetallePage } from '../tienda-detalle/tienda-detalle.page';
import { ModalController } from '@ionic/angular';

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
  constructor(public _service_tienda:TiendaService, public viewCtrl: ModalController ) {
    this._service_tienda.tiendas = [];
   }

  ngOnInit() {
    this._service_tienda.getTienda();
    this.listzonas();
    this.listsugeridos();
  }

  listzonas(){
    this._service_tienda.getZonas().subscribe(
        res=>{
          console.log("zonas"+res);
           this.lstzonas = res;
           this.zona = this.listzonas.length>0 ? this.listzonas[0]:undefined; 
        }
    );
  }

  listsugeridos(){
    this._service_tienda.getSugeridos().subscribe(
        res=>{
           this.lstsugeridos = res;
           this.sugerido = this.lstsugeridos.length>0 ? this.lstsugeridos[0]:undefined; 
        }
    );
  }

  onClick(id:any){

  }

  siguiente_pagina(infinite){
    this._service_tienda.getTienda().then(()=> {
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

 

}
