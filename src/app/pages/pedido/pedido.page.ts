import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CesionPage } from '../cesion/cesion.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaTiendaPage } from '../mapa-tienda/mapa-tienda.page';

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

  constructor(private geolocation: Geolocation,private router:Router, public viewCtrl: ModalController,public alertController: AlertController) {
      this.ubicacion ="Click en el boton gps"
   }

  ngOnInit() {
    this.politica = "Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería enDebes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en Debes revisar muy bien los empaques y verificar que estén en perfecto estado en compañía del transportador antes de firmar la guía. En caso de evidenciar una avería en el empaque no reciba el producto ni firme la guía, si firmas sin revisar perderás el derecho de reclamación.En el caso de los televisores se deben encender durante las 24 horas siguientes después de la entrega para revisar que la pantalla no esté quebrada o tenga golpes.Para que la reclamación sea válida debes conservar los empaques originales, los accesorios y manuales; además de no evidenciar uso.Si compras artículos de gran dimensión como electrodomésticos, muebles o colchones y tu residencia es en un edificio, la entrega se realizará en la puerta de tu apartamento siempre y cuando se pueda acceder por ascensor. Si el acceso es por las escalas y el producto cabe, sólo se sube hasta el quinto piso. Después del quinto piso y sin ascensor, es su responsabilidad contratar personal capacitado para desplazar el producto hasta tu casa; además debes firmar la guía en el primer piso, antes de subir el producto.Si compras un nevecón y se requiere desmonte de puertas, se debe solicitar con anticipación el servicio técnico de la marca, el valor es asumido por el cliente y no está incluido en el valor pagado por el producto. En caso que el producto requiera instalación (Estufas, Nevecones, Secadoras y Aires Acondicionados), se debe contactar a la marca y el cliente debe asumir este valor.Tenga en cuenta que debe contactar a la línea de Servicio al Cliente 018000112858 dentro de las 24 horas siguientes a la entrega, donde debe brindar la información completa y clara, el asesor le solicitará evidencia fotográfica de los empaques y del producto donde tendrá un máximo de 7 días calendario para enviar las fotografías; de lo contrario no se aceptará la reclamación. fin"
  }

  close(){
    this.viewCtrl.dismiss();
  }


  onSaveForm() {
    this.openPolitica();
    if(true){
      //llama servicio post
    
    }else{
      console.log("NO VALIDO")
        this.openPolitica();
    }
   
  }


  setRestSave(){
    console.log("GUARDAR")
    
    
  }



  openPolitica(){
    this.presentAlertConfirm();
}


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      mode:'ios',
      header: 'Politicas de envio',
      message: this.politica,
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
            this.setRestSave();
          }
        }
      ]
    });

    await alert.present();
  }



  geolocalizacion(){
    console.log("PETICION DE GEOLOCALIZACION")
    this.ubicacion ="Ubicacion obtenida"
   
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      const coords = resp.coords.latitude + "," + resp.coords.longitude;
      this.abrirModalMapaGoogle( resp.coords.latitude ,resp.coords.longitude);
      console.log(coords)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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
  const myModal = await this.viewCtrl.create({
    component:MapaTiendaPage,
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
  }
  



}
