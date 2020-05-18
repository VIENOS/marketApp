import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map = null;
  //markers:any[] = []
  markerInicio: any;
  markerFin: any;
  myLatlng: any;
  myLatlng2: any;
  pinImage: any;
  ingresarInicio:boolean;
  ingresarFin: boolean;
  latitudInicio:any;
  longitudInicio:any;
  latitudFin:any;
  longitudFin:any;
  distanciaKm:any;
  
  constructor(public viewCtrl: ModalController, private navParams: NavParams, public _recadeoService: RecadeoService) {
       this.ingresarInicio = false;
       this.ingresarFin = false;
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
      title: titulo,
      //draggable: true
      //label: "Partida"
    });

  }


  addMarkerFin(posicion: any, titulo: any,) {
    return new google.maps.Marker({
      position: posicion,
      //icon: icono,
      animation: google.maps.Animation.DROP,
      map: this.map,
      title: titulo
    });

  }


  guardar() {
    if(this.markerInicio!==undefined && this.markerInicio!=null && this.markerFin!=undefined && this.markerFin!=null){
      let myLatlng = new google.maps.LatLng(this.latitudInicio, this.longitudInicio);
      let myLatlng2 = new google.maps.LatLng(this.latitudFin, this.longitudFin);
  
      this.calcularDistancia(myLatlng,myLatlng2);
  
      this.viewCtrl.dismiss({
        latitudInicio: this.latitudInicio,
        longitudInicio: this.longitudInicio,
        latitudFin : this.latitudFin,
        longitudFin : this.longitudFin,
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
      if(this.ingresarInicio){
        if (this.markerInicio == undefined || this.markerInicio == null) {
          // this.markers.push(this.addMarkerFin(e.latLng,"Inicio",this.pinImage))
          this.markerInicio = this.addMarkerInicio(e.latLng, "Inicio");
          console.log("LATITUD INICIO = "+e.latLng.lat())
          this.latitudInicio = e.latLng.lat();
          console.log("LONGITUD INICIO = "+e.latLng.lng())
          this.longitudInicio = e.latLng.lng();
       }
      }
      if(this.ingresarFin){
        if (this.markerFin == undefined || this.markerFin == null) {
          // this.markers.push(this.addMarkerFin(e.latLng,"Inicio",this.pinImage))
          this.markerFin = this.addMarkerFin(e.latLng, "Fin");
          console.log("LATITUD FIN = "+e.latLng.lat())
          this.latitudFin = e.latLng.lat();
          console.log("LONGITUD FIN = "+e.latLng.lng())
          this.longitudFin = e.latLng.lng();
       }
      } 
    });
  }

  elimnarLlegada() {
    this.markerFin.setMap(null);
    this.markerFin = null;
  }

  agregarInicio(){
     if(!(this.ingresarFin && (this.markerFin===undefined || this.markerFin===null))){
           this.ingresarInicio=true;
     }
    
   
  }
  agregarFin(){
    if(!(this.ingresarInicio && (this.markerInicio===undefined || this.markerInicio===null))){
      this.ingresarFin=true;
     }

  }

}
