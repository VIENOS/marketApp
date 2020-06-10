import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Datos } from 'src/app/interfaces/interfaces';
import { CesionService } from 'src/app/services/cesion/cesion.service';

@Component({
  selector: 'app-cesion',
  templateUrl: './cesion.page.html',
  styleUrls: ['./cesion.page.scss'],
})
export class CesionPage implements OnInit {

  patternEmail : any = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  public politica :any;
  contactForm : FormGroup;

  constructor(public _service_cesion:CesionService,
    private router:Router, public viewCtrl: ModalController,public alertController: AlertController) {
    
      console.log("CESES")
   }

   
  ngOnInit() {
   // this.contacto.nombre= "Melvin Saavedra";
  //  this.contacto.email="mel@gmail.com";
  //  this.contacto.celular=933853399;
 //   this.contacto.fecha="1995-02-15";
 
    this.verificarForm();

  }

   async verificarForm(){
      this._service_cesion.datos = await  this._service_cesion.cargarCesion();
      if(this._service_cesion.datos){
           console.log("EDITAR")
           let dat  = this._service_cesion.datos;
          this.contactForm = this.editarFormGroup(dat.nombre,dat.email,dat.celular,dat.fechanacimiento);
      }else{
        console.log("new")
        this.contactForm = this.createFormGroup();
      }
    }

    //creando la clase Formulario Group
    createFormGroup(){
      return new FormGroup({
       nombre: new FormControl('',[Validators.required]),
       email: new FormControl('',[Validators.required,Validators.pattern(this.patternEmail)]),
       celular: new FormControl('',[Validators.required,Validators.min(900000000), Validators.max(1000000000)]),
       fecha: new FormControl('',[Validators.required])
      })
   };

   editarFormGroup(nombre:any,email:any,celular:any, fecha:any){
    return new FormGroup({
     nombre: new FormControl(nombre,[Validators.required]),
     email: new FormControl(email,[Validators.required,Validators.pattern(this.patternEmail)]),
     celular: new FormControl(celular,[Validators.required,Validators.min(900000000), Validators.max(1000000000)]),
     fecha: new FormControl(fecha,[Validators.required])
    })
 };

  close(){
    this.viewCtrl.dismiss();
  }

  
  onResetForm(){
    this.contactForm.reset();
  }

  onSaveForm() {
   
    if(this.contactForm.valid){
      //llama servicio post
      console.log(this.contactForm.value)
      let contacto = this.contactForm.value;
      let datePipe = new DatePipe('en-US');
      let numeroCel = contacto.celular;
      //console.log("tipo numero:: " + typeof(numeroCel));
      contacto.fecha = datePipe.transform(contacto.fecha, 'yyyy-MM-dd');
      let datos = new Datos();
      datos.nombre = contacto.nombre;
      datos.email = contacto.email;
      datos.celular = numeroCel.toString();
      //console.log("tipo num convertido:: " + typeof(datos.celular) );
      datos.fechanacimiento = contacto.fecha;
      this._service_cesion.saveStorageCesion(datos);
      console.log("VALIDO")
    
    }else{
      console.log("NO VALIDO")
     
    }
   
  }


  setRestSave(){
    console.log("GUARDAR")
    this.onResetForm();
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
get nombre(){ return this.contactForm.get('nombre');}
get fecha(){ return this.contactForm.get('fecha');}

}
