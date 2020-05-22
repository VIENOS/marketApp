import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoDetallePage } from '../contacto-detalle/contacto-detalle.page';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CesionService } from 'src/app/services/cesion/cesion.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ContactosService } from 'src/app/services/contactos/contactos.service';
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {


   public listpedido:any;

  constructor(private serviceContacto:ContactosService, private servicio_pedidos:PedidoService,public _servicio_cesion:CesionService,public viewCtrl: ModalController,  public service_carrito:CarritoService) {
  
    this.service_carrito.longCarrito();

     this.verificarSiExisteDatosDeUsuario();
   
   }


   async verificarSiExisteDatosDeUsuario(){
    console.log("VERIFICA")
    this._servicio_cesion.datos = await  this._servicio_cesion.cargarCesion();
    if(this._servicio_cesion.datos){
      console.log("SI HAY DATA")
       this.listarPedidos();
    }else{
      console.log("NO HAY DATA")
    }
  }

  ngOnInit() {

  }

   listarPedidos(){
    this.servicio_pedidos.getListPedidos(this._servicio_cesion.datos).subscribe(
      res => {
           this.listpedido = res;
           console.log(JSON.stringify(this.listpedido))
      },
      error => {
        console.log("NO HAY DATA ERROR "+error.status)
      }
    );

   }

  
  openDetalle(pedido:any){

    console.log("pedido = "+pedido.id)
    this.abrirModal(pedido.id);
 
  }


  async abrirModal(ids){
    const myModal = await this.viewCtrl.create({
      component:ContactoDetallePage,
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
