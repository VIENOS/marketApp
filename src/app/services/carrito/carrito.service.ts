import { Injectable } from '@angular/core';
import { CarritoPage } from 'src/app/pages/carrito/carrito.page';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(public viewCtrl: ModalController) { }


 

  async abrirModalCarrito(){
    const myModal = await this.viewCtrl.create({
      component:CarritoPage
      });
    await myModal.present();
  }


}
