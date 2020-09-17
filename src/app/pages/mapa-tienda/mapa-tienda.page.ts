import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-mapa-tienda',
  templateUrl: './mapa-tienda.page.html',
  styleUrls: ['./mapa-tienda.page.scss'],
})
export class MapaTiendaPage implements OnInit {

  map = null;
  markers:any[] = []
  distanciaKm:any;
  marker:any;
  latitud:any;
  longitud:any;
  mapEle:HTMLElement;


 constructor(
  public geo: Geolocation,
  private loadCtrl:LoadingController,public viewCtrl: ModalController, private navParams: NavParams, public _recadeoService: RecadeoService) {
   
}

ngOnInit() {
 //para cargar el mapa 
 this.map=null;
 this.loadMap();


}


calcularDistancia(myLatlng, myLatlng2) {
  console.log("TIENDA = "+myLatlng2)
  console.log("YO = "+myLatlng)
 let distance = google.maps.geometry.spherical.computeDistanceBetween(myLatlng, myLatlng2);
 // distancees un valor en metros
 this.distanciaKm = this._recadeoService.round((distance / 1000) ,2);
 console.log( this.distanciaKm + 'Kms');
// this.pinImage = new google.maps.MarkerImage("../assets/imgs/llamar.png");

}

 loadMap() {

 // create a new map by passing HTMLElement
 this.mapEle = document.getElementById('mapita');
 // create LatLng object
 let myLatLng = { lat: -10.0000000, lng: -76.0000000 };
 // create map
 this.map = new google.maps.Map( this.mapEle , {
   center: myLatLng,
   zoom: 5
 });

 /*google.maps.event.addListenerOnce(this.map, 'idle', () => {
  
// mapEle.classList.add('show-map');
});*/
//this.getPosition();

 this.metodo2();

}

async getPosition() {
  const loading =  await this.loadCtrl.create();
  loading.present();
  this.geo.getCurrentPosition().then(resp => {
    console.log("ta bien")
      this.setCenter(resp);
      loading.dismiss(); 
  }).catch((error) => {
    console.log("ERROR CAHTC")
    let mapElee: HTMLElement = document.getElementById('mapita');
    let myLatLngs = { lat: -10.0000000, lng: -76.0000000 };
    this.map = new google.maps.Map(mapElee, {
        center: myLatLngs,
        zoom: 12
    });
    loading.dismiss();
  })
}

setCenter(position: Geoposition) {
  let myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
  //this.map.setCenter(myLatLng);
  this.map = new google.maps.Map(this.mapEle , {
    center: myLatLng,
    zoom: 12
  });
  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    this.mapEle .classList.add('show-map')
    //  this.map.classList.add('show-map');
  });
  this.metodo2();
}

addMarkerInicio(posicion: any, titulo: any) {
 return new google.maps.Marker({
   position: posicion,
   map: this.map,
   animation: google.maps.Animation.DROP,
   title: titulo,
   draggable: true
   //label: "Partida"
 });

}





guardar() {
// console.log(this.marker.position) 
 console.log("LATITUD FIN  "+this.latitud)
 console.log("LONGITUD FIN  "+this.longitud)

 if(this.marker!==undefined && this.marker!=null){
 //  console.log("GUARDAR = "+this.marker.position)
   
   let myLatlng = new google.maps.LatLng(this.latitud, this.longitud);
   // Longitud y latitud de tienda
   let myLatlng2 = new google.maps.LatLng(this.navParams.get('latitudtienda'), this.navParams.get('longitudtienda'));

   this.calcularDistancia(myLatlng,myLatlng2);

   this.viewCtrl.dismiss({
     latitud: this.latitud,
     longitud: this.longitud,
     distanciaKm : this.distanciaKm
   });
 }

}

close() {
 this.viewCtrl.dismiss();
}



metodo2() {
 google.maps.event.addListener(this.map, 'click', e => {
   /*for(let i in this.markers){
      this.markers[i].setMap(null);
   }*/
  
     if (this.marker === undefined || this.marker === null) {
       // this.markers.push(this.addMarkerFin(e.latLng,"Inicio",this.pinImage))
       this.marker = this.addMarkerInicio(e.latLng, "Inicio");
       console.log("LATITUD  = "+e.latLng.lat())
       this.latitud = e.latLng.lat();
       console.log("LONGITUD  = "+e.latLng.lng())
       this.longitud = e.latLng.lng();
    //
       this.metodoDrog();
    }
   
 });

}


metodoDrog(){

  google.maps.event.addListener(this.marker, 'dragend', e=>{
    //var latLng = e.latLng; 
    if (this.marker != undefined || this.marker != null) {
    console.log("LATITUD  = "+e.latLng.lat())
    this.latitud = e.latLng.lat();
    console.log("LONGITUD  = "+e.latLng.lng())
    this.longitud = e.latLng.lng();
    //currentLatitude = latLng.lat();
    //currentLongitude = latLng.lng();
  }
  }); 
}



ubicacionRango(){
  this.getPosition();
}



/*metodo1(){
  google.maps.event.addListener(this.map,'click', e => {
    for(let i in this.markers){
       this.markers[i].setMap(null);
    }
    this.markers.push(this.addMarker(e.latLng,"Inicio"))
    
    console.log(e)
  });
}*/

}