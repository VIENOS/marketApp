import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ContactosService } from 'src/app/services/contactos/contactos.service';

@Component({
  selector: 'app-contacto-detalle',
  templateUrl: './contacto-detalle.page.html',
  styleUrls: ['./contacto-detalle.page.scss'],
})
export class ContactoDetallePage implements OnInit {
  
  public item:any;
  public x:number;
  public pintado:boolean;
  public pintado2:boolean;
  public pintado3:boolean;
  public pintado4:boolean;
  public pintado5:boolean;
  public value:any;
  public comentario:string;
  public idPedido:any;
  constructor(public alertController: AlertController,private _service_contactos :ContactosService ,private router:Router, public viewCtrl: ModalController,private navParams: NavParams) {
     this.comentario ="";
    this.x=0;
    this.pintado=false;
    this.value=0;
     this.idPedido  = this.navParams.get('id');
     console.log("ID PEDIDO = "+this.idPedido)
   }

  ngOnInit() {
    this.getMotorizado();
  }

  
  getMotorizado(){
    console.log("ILLAMADNDO PEDIDO = ")
    this._service_contactos.getMotorizado(this.idPedido).subscribe(
      res=>{
           this.item= res;
     }   
    );
  }

  close(){
    this.viewCtrl.dismiss();
  }

  cero(value:any){  
    console.log("value  "+value)
    this.value = value;
    this.pintado= value >= 1 ? true : false;
    this.pintado2= value >= 2 ? true : false;
    this.pintado3= value >= 3 ? true : false;
    this.pintado4= value >= 4 ? true : false;
    this.pintado5= value >= 5 ? true : false;
    // this.x++;
    if(value==1){
      this.x = this.x + 1;
      if(this.x===2){
          this.x= 0;
        this.pintado = false;
        this.value=0;
      }
    }

 console.log(this.x)
  }


  finalizar(){
    console.log("VALUE FINAL = "+this.value)
    console.log("COMENTARIO = "+this.comentario)
    
    let pedido= {
      "id": this.item.id,
      "nombre" : this.item.nombre,
      "nombreMotorizado": this.item.nombreMotorizado
    }

    let request = {
      "pedido" : pedido,
      "valoracion" : this.value,
      "comentario" : this.comentario
    };
  
    console.log("REQUEST RECADEO = "+JSON.stringify(request))
     this._service_contactos.finalizarPedido(request).subscribe(
     res => {
        
          this.close();

     },
     error => {
      
        this.presentAlertConfirm('Error','Revise su conexion a internet');
         
     }
   );

  }


  async presentAlertConfirm(header,message) {
    const alert = await this.alertController.create({
      mode:'ios',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
         
          }
        }
      ]
    });

    await alert.present();
  }

}
