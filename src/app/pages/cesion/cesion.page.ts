import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cesion',
  templateUrl: './cesion.page.html',
  styleUrls: ['./cesion.page.scss'],
})
export class CesionPage implements OnInit {

  patternEmail : any = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  public politica :any;
  public contacto:any;



  contactForm : FormGroup;
  constructor(private router:Router, public viewCtrl: ModalController,public alertController: AlertController) {
   
   }

   
  ngOnInit() {
   // this.contacto.nombre= "Melvin Saavedra";
  //  this.contacto.email="mel@gmail.com";
  //  this.contacto.celular=933853399;
 //   this.contacto.fecha="1995-02-15";
    this.contactForm = this.createFormGroup();


  }

    //creando la clase Formulario Group
    createFormGroup(){
      return new FormGroup({
       nombre: new FormControl('',[]),
       email: new FormControl('',[Validators.pattern(this.patternEmail)]),
       celular: new FormControl('',[Validators.min(900000000), Validators.max(1000000000)]),
       fecha: new FormControl('',[])
      })
   };

   editarFormGroup(){
    return new FormGroup({
     nombre: new FormControl("Melvin Saavedra",[]),
     email: new FormControl("mel@gmail.com",[Validators.pattern(this.patternEmail)]),
     celular: new FormControl(933853399,[Validators.min(900000000), Validators.max(1000000000)]),
     fecha: new FormControl("1995-02-15",[])
    })
 };

  close(){
    this.viewCtrl.dismiss();
  }

  
  onResetForm(){
    this.contactForm.reset();
  }

  onSaveForm() {
    console.log(this.contactForm.value)
    this.contacto = this.contactForm.value;
    let datePipe = new DatePipe('en-US');
    this.contacto.fecha = datePipe.transform(this.contacto.fecha, 'yyyy-MM-dd');

    console.log(this.contacto.fecha)
    if(this.contactForm.valid){
      //llama servicio post
      console.log("VALIDO")
    
    }else{
      console.log("NO VALIDO")
     
    }
   
  }


  setRestSave(){
    console.log("GUARDAR")
    this.onResetForm();
  }








  geolocalizacion(){
    console.log("PETICION DE GEOLOCALIZACION")
  }





  
openCesion(){
  //this.router.navigate(["/categorias/",categoria.id]);
  this.abrirModalCesion();
}

async abrirModalCesion(){
const myModal = await this.viewCtrl.create({
  component:CesionPage
});
await myModal.present();
}


get email(){ return this.contactForm.get('email');}
get celular(){ return this.contactForm.get('celular');}

}
