import { Component, OnInit } from '@angular/core';
import { CesionPage } from '../cesion/cesion.page';
import { ModalController, AlertController } from '@ionic/angular';
import { MapaPage } from '../mapa/mapa.page';
import { CarritoPage } from '../carrito/carrito.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CesionService } from 'src/app/services/cesion/cesion.service';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { LlamadaService } from 'src/app/services/llamada/llamada.service';

@Component({
  selector: 'app-recadeo',
  templateUrl: './recadeo.page.html',
  styleUrls: ['./recadeo.page.scss'],
})
export class RecadeoPage implements OnInit {
  ubicacionMsg:any;
  ubicacion:any;
  politica :any;
  numrecadeos:any;
  distancia:any;
  latitudInicio : any;
  latitudFin:any;
  longitudInicio:any;
  longitudFin:any;
  montoTotal:any;
  kmNopermitidos:any;
  tipoPago:any;
  lstTipoPago:any;
  habilitarpago:any;
  messagepago:any;
  errormensaje:any;
  constructor( public router:Router,public _servicio_cesion:CesionService  ,private geolocation: Geolocation,public viewCtrl: ModalController,public alertController: AlertController 
    , public service_carrito:CarritoService,private _service_recadeo:RecadeoService,private _servicio_pedido:PedidoService,private _servcio_producto:ProductoService,public _service:LlamadaService) {
  
    this.service_carrito.longCarrito();
    this.ubicacionMsg ="Click en el boton gps"
    this.kmNopermitidos=false;
    this.habilitarpago=false;
  }

  ngOnInit() {
    console.log("SE EJECTUA?")
    this.loadListPagos();
  }

  abrirMapa(){
    console.log("PETICION DE GEOLOCALIZACION")
    let lat:any = -10.0000000;
    let long:any = -76.0000000;
    this.abrirModalMapaGoogle(lat,long);
   /* this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.distancia =null;
      const coords = resp.coords.latitude + "," + resp.coords.longitude;
      console.log("COORDEANADAS GPS ="+coords)
      //this.ubicacionMsg ="Ubicacion obtenida";
      this.abrirModalMapaGoogle(resp.coords.latitude,resp.coords.longitude);
   
     }).catch((error) => {
       console.log('Error getting location', error);
       this.ubicacionMsg ="Active su GPS"
     });*/
 
   
  }

  onSaveForm(){
    console.log("SE GUARDA  ? " +this.distancia)
    if(this.distancia!=undefined && this.numrecadeos!=undefined){
      this.verificarSiExisteDatosDeUsuario();
    }else{
      if(this.distancia===undefined){
        this.presentAlertConfirm('Error','No ingreso los puntos de partida y llegada para el recadeo, ingréselos dando click en el boton de gps del campo UBICACION DE PARTIDA Y LLEGADA',false);
      }else{
        this.presentAlertConfirm('Error','No ingreso el numero de paquetes a enviar',false);
      }
    }
    
  }


  
  async verificarSiExisteDatosDeUsuario(){
    this._servicio_cesion.datos = await  this._servicio_cesion.cargarCesion();
    if(this._servicio_cesion.datos){
      this._servicio_pedido.getPolitica().subscribe(
        res=>{
            this.politica = res.mensaje;
            if(this.kmNopermitidos){
              this.presentAlertConfirm('Error',this.errormensaje,false);
            }else{
              this.presentAlertConfirm('Politicas de envio',this.politica,true);

            }
            
        }
      );
      
    }else{
      this.presentAlertConfirm('Error','Ingrese datos de Usuario en la seccion Datos Personales',false);

    }
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

async presentAlertConfirm(header,message,save) {
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
          if(save){
            this.guardarRecadeo();
          }
          
        }
      }
    ]
  });

  await alert.present();
}


guardarRecadeo(){

  console.log("GUARDAR")
  let coordenadasInicio= {
    "latitud": this.latitudInicio,
    "longitud" : this.longitudInicio
  }
  let coordenadasFinal= {
    "latitud": this.latitudFin,
    "longitud" : this.longitudFin
  }
  console.log("ZONA = "+ this._service.zonaId)
  let request = {
    "id_zona" : this._service.zonaId,
    "montoTotal" : this.montoTotal,
    "datosPersonales" : this._servicio_cesion.datos,
    "coordenadasInicio" : coordenadasInicio,
    "coordenadasFinal" : coordenadasFinal,
    "distanciakm" : this.distancia,
    "numPaquetes" : this.numrecadeos,
    "tipoPago" : this.tipoPago.nombre
  };

  console.log("REQUEST RECADEO = "+JSON.stringify(request))
   this._service_recadeo.nuevoRecadeo(request).subscribe(
   res => {
        //
        
        this.latitudFin = undefined;
        this.latitudInicio =undefined;
        this.longitudFin = undefined;
        this.longitudInicio = undefined;
        this.ubicacionMsg ="Click en el boton gps"
        this.kmNopermitidos=false;
        this.habilitarpago=false;
        this.montoTotal=0.00;
        this.distancia=undefined;

        this.presentAlertConfirmGuardado('Avso','El recadeo se guardo exitosamente');
   },
   error => {
    
      this.presentAlertConfirm('Error','Revise su conexion a internet',false);
       
   }
 );
}


/*
async abrirModalMapaGoogle(latitud,longitud){
const myModal = await this.viewCtrl.create({
  component:MapaPage,
  componentProps:{latitud:latitud,longitud:longitud}
});
await myModal.present();
const {data} = await myModal.onDidDismiss();
//console.log("DATA = "+JSON.stringify(data))
if(data["distanciaKm"]!=null && data["distanciaKm"]!=undefined){
    this.distancia = data["distanciaKm"];
    console.log("DISTANCIAA = "+this.distancia);
    this.ubicacionMsg ="Ubicaciones obtenidas";
}

}*/

async abrirModalMapaGoogle(latitud,longitud){
  const myModal = await this.viewCtrl.create({
    component:MapaPage,
    componentProps:{latitud:latitud,longitud:longitud}
  });
  await myModal.present();
  const {data} = await myModal.onDidDismiss();
  //console.log("DATA = "+JSON.stringify(data))
  if(data["distanciaKm"]!=null && data["distanciaKm"]!=undefined){
      this.distancia = data["distanciaKm"];
      this.distancia = this.distancia.toString().replace(/\./g,',');
      console.log("DISTANCIAA = "+this.distancia);
      this.ubicacionMsg ="Ubicaciones obtenidas";
  }
  this.latitudFin = data["latitudFin"]
  this.latitudInicio = data["latitudInicio"]
  this.longitudFin = data["longitudFin"]
  this.longitudInicio = data["longitudInicio"]
  this.calculo();

  }

  calculo(){
    console.log("GUARDAR")
    let coordenadasInicio= {
      "latitud": this.latitudInicio,
      "longitud" : this.longitudInicio
    }
    let coordenadasFinal= {
      "latitud": this.latitudFin,
      "longitud" : this.longitudFin
    }
    
    let request = {
      "datosPersonales" : this._servicio_cesion.datos,
      "coordenadasInicio" : coordenadasInicio,
      "coordenadasFinal" : coordenadasFinal,
      "distanciakm" : this.distancia,
      "numPaquetes" : this.numrecadeos
    };
  
  console.log("REQUEST RECADEO = "+JSON.stringify(request))
  this._service_recadeo.recadeoCaluclo(request).subscribe(
  res => {
        console.log("MONTO "+JSON.stringify(res))
      if(res.montoTotal){
        this.kmNopermitidos=false;
        this.montoTotal =  res.montoTotal;
      }else{
        this.montoTotal = 0.00;
        this.errormensaje = res.mensaje;
        this.kmNopermitidos=true;
      } 

      
  },
  error => {
   
    // this.presentAlertConfirm('Error','Revise su conexion a internet',false);
      
  }
);


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



OnChange($event){
  if(this.tipoPago!==undefined && this.tipoPago.id===0){
    this.habilitarpago = false;

    return;
  }

  if(this.tipoPago.id===1){
       this.messagepago="Debe asegurarse tener el dinero exacto por medidas de precaucion"
  }else{
    if(this.tipoPago.id===2){
      this.messagepago="el motorizado llevara la maquina procesadora de tarjetas"
    }
  }
  this.habilitarpago = true;
 this.presentAlertConfirm('Aviso',this.messagepago,false);
}

loadListPagos(){
  this._servcio_producto.getListTipoPagos().subscribe(
    res=>{
       this.lstTipoPago = res;
     //  this.tipoPago = this.lstTipoPago[0];
      console.log(res);
   }   
  );
}

verificarPaquetes(){
  console.log("NUM RECADEO = "+this.numrecadeos)
  this.numrecadeos = this.numrecadeos>4  ? 4 : this.numrecadeos; 
  this.calculo();
}


async presentAlertConfirmGuardado(header,message) {
  const alert = await this.alertController.create({
    mode:'ios',
    header: header,
    message: message, 
    buttons: [
       {
        text: 'Aceptar',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(["/tabs/inicio"]);
          
        }
      }
    ]
  });

  await alert.present();
}
}
