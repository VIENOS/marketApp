import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CesionPage } from '../cesion/cesion.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaTiendaPage } from '../mapa-tienda/mapa-tienda.page';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { CesionService } from 'src/app/services/cesion/cesion.service';
import { Storage } from '@ionic/storage';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CalculosService } from 'src/app/services/calculos/calculos.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {



  public politica :any;
  public direccion : any;
  public ubicacion : any;
  public gps : any;
  public distancia:any;
  public ubicacionMsg:any;
  public latitud:any;
  public longitud:any;
  public longTienda:any;
  public latTienda:any;
  public tipopago:any;
  public totalpedido:any;
  public totaldelivery: any;
  public montoTotal : any;
  public cupon:any;
  public habilitarEnviar:any;
  public errorDistancia:any;

  constructor(public service_carrito:CarritoService ,private navCtrl:NavController,private _servicio_pedido:PedidoService, public _servicio_cesion:CesionService,private storage:Storage,public _servicio_carrito:CarritoService,
    private geolocation: Geolocation,private router:Router, public viewCtrl: ModalController,public alertController: AlertController,private navParams: NavParams,private _servicioCalculos:CalculosService) {
      this.ubicacion ="Click en el boton gps"
      this.latTienda = this.navParams.get('latitudtienda');
      //this.latTienda = -9.02218986119934;
      console.log("LATITUD TIENDA = "+ this.latTienda)
     

      this.longTienda = this.navParams.get('longitudtienda');
      //this.longTienda =-78.614022731781;
      console.log("LONGITUD TIENDA = "+ this.longTienda)
      this.tipopago = this.navParams.get('tipopago');
      this.totalpedido = this.navParams.get('totalpedido');
      this.totaldelivery = this.navParams.get('totaldelivery');
      this.montoTotal =  this.navParams.get('montoTotal');
      this.cupon =  this.navParams.get('cupon');
      this.habilitarEnviar = false;
      this.errorDistancia = true;
   }

  ngOnInit() {
  }



  close(){
    this.viewCtrl.dismiss({
      cerrar: false,
    });
  }
  ionViewWillEnter () {
  
  }

  onSaveForm() {
   
    if(this.direccion && this.latitud && this.longitud){
      //llama servicio post
      this.verificarSiExisteDatosDeUsuario();
    }else{
      console.log("NO VALIDO")
      this.presentAlertConfirm('Error','No ingreso direccion de casa o no ingreso la ubicacion de destino',false);
    }
   
  }



  async verificarSiExisteDatosDeUsuario(){
    this._servicio_cesion.datos = await  this._servicio_cesion.cargarCesion();
    if(this._servicio_cesion.datos){
        this.openPolitica();
    }else{
      this.presentAlertConfirm('Error','Ingrese datos de Usuario en la seccion Datos Personales',false);

    }
  }


  async setRestSave(){
    const getCarrito = await this.storage.get('carrito');
    console.log("GUARDAR")
    let coordeandas= {
      "latitud": this.latitud,
      "longitud" : this.longitud
    }
    let request = {
      "datosPersonales" : this._servicio_cesion.datos,
      "coordenadas" : coordeandas,
      "distanciakm" : this.distancia,
      "direccion" : this.direccion,
      "tipoPago" : this.tipopago,
      "totalPedido" : this.totalpedido,
      "totalDelivery" : this.totaldelivery,
      "montoTotal" : this.montoTotal,	
      "cupon" : this.cupon,
      "carrito" : getCarrito
    };
  
    console.log("REQUEST CON CUPON = "+JSON.stringify(request))
     this._servicio_pedido.nuevoPedido(request).subscribe(
     res => {
          //this.router.navigate(["/tabs/inicio"]);
          this.service_carrito.resetCarrito();
         this.presentAlertConfirmFinPedido('Aviso','Su pedido esta en proceso')
     },
     error => {
   
      this.presentAlertConfirm('Error','Revise su conexion a internet',false);
         
     }
   );
  
    
  }



  openPolitica(){
    
    this._servicio_pedido.getPolitica().subscribe(
      res=>{
          this.politica = res.mensaje;
          this.presentAlertConfirm('Politicas de envio',this.politica,true);
      }
    );
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
              this.setRestSave();
            }
          }
        }
      ]
    });

    await alert.present();
  }



  geolocalizacion(){
    console.log("PETICION DE GEOLOCALIZACION")
  //  let lat:any = -10.0000000;
   // let long:any = -76.0000000;
    this.abrirModalMapaGoogle(this.latTienda,this.longTienda);
   
   /* this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.ubicacion ="Ubicacion obtenida"
      const coords = resp.coords.latitude + "," + resp.coords.longitude;
      this.abrirModalMapaGoogle( resp.coords.latitude ,resp.coords.longitude);
      console.log(coords)
     }).catch((error) => {
       console.log('Error getting location', error);
     });*/
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



async abrirModalMapaGoogle(latitud,longitud){
    this.latitud = undefined;
     this.longitud = undefined;
  const myModal = await this.viewCtrl.create({
    component:MapaTiendaPage,
    componentProps:{latitudtienda:latitud,longitudtienda:longitud}
  });
  await myModal.present();
  const {data} = await myModal.onDidDismiss();
  //console.log("DATA = "+JSON.stringify(data))
  if(data["distanciaKm"]!=null && data["distanciaKm"]!=undefined){
      this.distancia = data["distanciaKm"];
      this.distancia= this.distancia + "";
      this.distancia = this.distancia.toString().replace(/\./g,',');
      console.log("DISTANCIAA = "+this.distancia);
      this.ubicacion ="Ubicaciones obtenidas";
  }
  this.latitud = data["latitud"];
  this.longitud = data["longitud"];
  this.calculos(this.distancia);

  }
  

  calculos(distancia){
    
    let request = {
      "cupon" : this.cupon,
      "distanciakm" : distancia,
      "carrito" : this._servicio_carrito.carrito
    };
  
    console.log("REQUEST CON CUPON = "+JSON.stringify(request))
     this._servicioCalculos.calculosMontosCarrito(request).subscribe(
     res => {
      console.log("RESPONSE CALUCL CARRITO = "+JSON.stringify(res))
          this.totalpedido = res.totalPedido;
          this.totaldelivery = res.totalDelivery;
          this.montoTotal = res.montoTotal;
          
          if(res.mensaje){
            this.presentAlertConfirm('Aviso',res.mensaje,false);
            this.habilitarEnviar=false;
          }else{
            this.habilitarEnviar=true;
          }
     },
     error => {
       
     }
   );
  }
  
  async presentAlertConfirmFinPedido(header,message) {
    const alert = await this.alertController.create({
      mode:'ios',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.viewCtrl.dismiss({
              cerrar: true,
             
            });
          }
        }
      ]
    });

    await alert.present();
  }



}
