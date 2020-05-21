import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { RecadeoService } from 'src/app/services/recadeo/recadeo.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
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
  mapEle:HTMLElement;
  
  constructor(
    public geo: Geolocation,
    public viewCtrl: ModalController, private navParams: NavParams, public _recadeoService: RecadeoService,
    private loadCtrl:LoadingController) {
       this.ingresarInicio = false;
       this.ingresarFin = false;
  }

  ngOnInit() {
    //para cargar el mapa 
  
    this.map=null;
    this.loadMap(this.navParams.get('latitud'), this.navParams.get('longitud'));


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
    this.mapEle = document.getElementById('map');
    // create LatLng object
    let myLatLng = { lat: -10.0000000, lng: -76.0000000 };
    // create map
    this.map = new google.maps.Map( this.mapEle, {
      center: myLatLng,
      zoom: 12
    });
    //metodo para mostar el mapa
   // 
  /* google.maps.event.addListenerOnce(this.map, 'idle', () => {
        loading.dismiss();
    // mapEle.classList.add('show-map');
    });*/
    this.getPosition();
    
  }


  async getPosition() {
    const loading =  await this.loadCtrl.create();
    loading.present();
    this.geo.getCurrentPosition().then(resp => {
        this.setCenter(resp);
        loading.dismiss(); 
    }).catch((error) => {
      let mapElee: HTMLElement = document.getElementById('map');
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
    this.map = new google.maps.Map(this.mapEle , {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
       // this.map.classList.add('show-map');
       this.mapEle.classList.add('show-map');
    });
    this.metodo2();
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
