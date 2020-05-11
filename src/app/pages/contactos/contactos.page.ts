import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoDetallePage } from '../contacto-detalle/contacto-detalle.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {




  //creando la clase Formulario Group



   public listpedido:any;

  constructor( public viewCtrl: ModalController) {
  
   }

  ngOnInit() {

  }


  
  openDetalle(producto:any){

    console.log("PRODUCTO = "+producto.id)
    this.abrirModal(producto.id);
  }


  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:ContactoDetallePage,
      componentProps:{id:ids}});
    await myModal.present();
  }


}
