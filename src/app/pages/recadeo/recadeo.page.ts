import { Component, OnInit } from '@angular/core';
import { CesionPage } from '../cesion/cesion.page';
import { ModalController, AlertController } from '@ionic/angular';
import { MapaPage } from '../mapa/mapa.page';
import { CarritoPage } from '../carrito/carrito.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CesionService } from 'src/app/services/cesion/cesion.service';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
import { Router } from '@angular/router';

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
  constructor( public router:Router,public _servicio_cesion:CesionService  ,private geolocation: Geolocation,public viewCtrl: ModalController,public alertController: AlertController 
    , public service_carrito:CarritoService,private _service_recadeo:RecadeoService) {
  
    this.service_carrito.longCarrito();
    this.ubicacionMsg ="Click en el boton gps"

  }

  ngOnInit() {
    this.politica = "Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en el empaque no reciba el producto ni firme la guía, si firmas sin revisar perderás el derecho de reclamación.En el caso de los televisores se deben encender durante las 24 horas siguientes después de la entrega para revisar que la pantalla no esté quebrada o tenga golpes.Para que la reclamación sea válida debes conservar los empaques originales, los accesorios y manuales; además de no evidenciar uso.Si compras artículos de gran dimensión como electrodomésticos, muebles o colchones y tu residencia es en un edificio, la entrega se realizará en la puerta de tu apartamento siempre y cuando se pueda acceder por ascensor. Si el acceso es por las escalas y el producto cabe, sólo se sube hasta el quinto piso. Después del quinto piso y sin ascensor, es su responsabilidad contratar personal capacitado para desplazar el producto hasta tu casa; además debes firmar la guía en el primer piso, antes de subir el producto.Si compras un nevecón y se requiere desmonte de puertas, se debe solicitar con anticipación el servicio técnico de la marca, el valor es asumido por el cliente y no está incluido en el valor pagado por el producto. En caso que el producto requiera instalación (Estufas, Nevecones, Secadoras y Aires Acondicionados), se debe contactar a la marca y el cliente debe asumir este valor.Tenga en cuenta que debe contactar a la línea de Servicio al Cliente 018000112858 dentro de las 24 horas siguientes a la entrega, donde debe brindar la información completa y clara, el asesor le solicitará evidencia fotográfica de los empaques y del producto donde tendrá un máximo de 7 días calendario para enviar las fotografías; de lo contrario no se aceptará la reclamación. fin"
    console.log("SE EJECTUA?")
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
        this.presentAlertConfirm('Error','No ingreso los puntos de partida y llegada para el recadeo, Ingreselos dando click en el boton de gps del campo UBICACION DE PARTIDA Y LLEGADA',false);
      }else{
        this.presentAlertConfirm('Error','No ingreso el numero de paquetes a enviar',false);
      }
    }
    
  }


  
  async verificarSiExisteDatosDeUsuario(){
    this._servicio_cesion.datos = await  this._servicio_cesion.cargarCesion();
    if(this._servicio_cesion.datos){
      this.presentAlertConfirm('Politicas de envio',this.politica,true);
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
  
  let request = {
    "datosPersonales" : this._servicio_cesion.datos,
    "coordenadasInicio" : coordenadasInicio,
    "coordenadasFinal" : coordenadasFinal,
    "distanciakm" : this.distancia,
    "numPaquetes" : this.numrecadeos
  };

  console.log("REQUEST RECADEO = "+JSON.stringify(request))
   this._service_recadeo.nuevoRecadeo(request).subscribe(
   res => {
        //
        
        this.latitudFin = undefined;
        this.latitudInicio =undefined;
        this.longitudFin = undefined;
        this.longitudInicio = undefined;
        this.router.navigate(["/tabs/inicio"]);
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
      console.log("DISTANCIAA = "+this.distancia);
      this.ubicacionMsg ="Ubicaciones obtenidas";
  }
  this.latitudFin = data["latitudFin"]
  this.latitudInicio = data["latitudInicio"]
  this.longitudFin = data["longitudFin"]
  this.longitudInicio = data["longitudInicio"]
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
