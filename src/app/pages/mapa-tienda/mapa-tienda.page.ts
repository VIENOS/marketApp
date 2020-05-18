import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
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


 constructor(public viewCtrl: ModalController, private navParams: NavParams, public _recadeoService: RecadeoService) {
   
}

ngOnInit() {
 //para cargar el mapa 
 this.loadMap(this.navParams.get('latitud'), this.navParams.get('longitud'));


 this.metodo2();
}

calcularDistancia(myLatlng, myLatlng2) {
 let distance = google.maps.geometry.spherical.computeDistanceBetween(myLatlng, myLatlng2);
 // distancees un valor en metros
 this.distanciaKm = this._recadeoService.round((distance / 1000) ,2);
 console.log( this.distanciaKm + 'Kms');
// this.pinImage = new google.maps.MarkerImage("../assets/imgs/llamar.png");

}

loadMap(latitud: any, longitud: any) {
 // create a new map by passing HTMLElement
 const mapEle: HTMLElement = document.getElementById('map_canvas');
 // create LatLng object
 const myLatLng = { lat: latitud, lng: longitud };
 // create map
 this.map = new google.maps.Map(mapEle, {
   center: myLatLng,
   zoom: 11
 });
 //metodo para mostar el mapa
 mapEle.classList.add('show-map');

}

addMarkerInicio(posicion: any, titulo: any) {
 return new google.maps.Marker({
   position: posicion,
   map: this.map,
   animation: google.maps.Animation.DROP,
   title: titulo
   //draggable: true
   //label: "Partida"
 });

}





guardar() {
 if(this.marker!==undefined && this.marker!=null){
 //  console.log("GUARDAR = "+this.marker.position)
   let myLatlng = new google.maps.LatLng(this.latitud, this.longitud);
   // Longitud y latitud de tienda
   let myLatlng2 = new google.maps.LatLng(-12.0210517,-77.0120473);

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
       console.log("LATITUD INICIO = "+e.latLng.lat())
       this.latitud = e.latLng.lat();
       console.log("LONGITUD INICIO = "+e.latLng.lng())
       this.longitud = e.latLng.lng();
    }
   
 });
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
