import { Injectable } from '@angular/core';
import { CarritoPage } from 'src/app/pages/carrito/carrito.page';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductoCont } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito : ProductoCont[] =[];
  long_carrito : number;

  constructor(private storage:Storage,public toastController: ToastController) { 
    this.cargarCarrito();
  }

  
  guardarCarrito(item:ProductoCont){
    
    const existe = this.carrito.find( prod => prod.producto.id === item.producto.id );
    if(existe){
      this.avisoCarrito('Producto ya agregado');
    }else{
      this.addStorageCarrito(item);
    }
   
  //this.resetCarrito()
  }


  addStorageCarrito(item:ProductoCont){     
    //this.carrito.unshift(item);
    this.carrito.push(item);
    this.storage.set('carrito',this.carrito);
    this.avisoCarrito('Se agrego al carrito');
    this.calcularTotalCantidadCarrito( this.carrito);
  
  }
  
 
  calcularTotalCantidadCarrito(carrito:ProductoCont[]){
    let total = 0;
     carrito.forEach(item => {
         total=  total + item.cantidad;
     });
     this.long_carrito= total;
  }


  async cargarCarrito(){
    const getCarrito = await this.storage.get('carrito');

    if(getCarrito){
      this.carrito = getCarrito;
    } 
  }

  longCarrito(){
    this.storage.get('carrito')
     .then(items => {
            if(items){
              this.carrito = items;
              console.log("CARRITO = "+JSON.stringify(this.carrito))
              this.calcularTotalCantidadCarrito(  this.carrito);
              console.log("longitud = "+this.long_carrito)
            } 
     });
  }


  resetCarrito(){
    this.carrito = [];
    this.storage.remove('carrito');
    this.long_carrito =0;
  }



  async avisoCarrito(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  editarCarrito(carrito:ProductoCont[]){
    this.carrito = carrito;
    this.storage.set('carrito',this.carrito);
    this.calcularTotalCantidadCarrito( this.carrito);
    
  }

  borrarItemDeCarrito(id){
    const posicion = this.carrito.findIndex(item=> item.producto.id === id);
    console.log("LA POSICION ES = "+posicion);
    this.carrito.splice(posicion, 1);
    this.storage.set('carrito',this.carrito);
    this.avisoCarrito('Se elimino producto del carrito');
    this.calcularTotalCantidadCarrito( this.carrito);
    console.log("FIN BORRAR ITEM ");
 }

}
