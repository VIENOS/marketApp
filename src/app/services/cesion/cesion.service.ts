import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Datos } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CesionService {
 
  datos:Datos;

  constructor(private storage:Storage,public toastController: ToastController) { 
    this.construc();
  }

  async construc(){
    this.datos = await this.cargarCesion();
  }

  saveStorageCesion(datos:Datos){     
    //this.carrito.unshift(item);
    this.datos = datos;
    this.storage.set('datos',this.datos);
    this.avisoCesion('Se guardaron los datos');
  }

  async avisoCesion(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  async cargarCesion(){
    const data = await this.storage.get('datos');

    if(data){
      this.datos = data;
      //console.log("SI DATA ="+data)
    } 
    return this.datos;
    
  }


  
  
  
}
