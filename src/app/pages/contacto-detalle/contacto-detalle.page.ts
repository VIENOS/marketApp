import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
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
  constructor(private _service_contactos :ContactosService ,private router:Router, public viewCtrl: ModalController,private navParams: NavParams) {
    this.x=0;
    this.pintado=false;
    this.value=0;
   }

  ngOnInit() {
    this.getMotorizado();
  }

  
  getMotorizado(){
    this._service_contactos.getMotorizado().subscribe(
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
  }

}
