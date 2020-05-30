import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiendaDetalleService {

  constructor(private http: HttpClient) { }

  
  getTienda(idtienda:number): Observable<any>{
    return this.http.get<any>(environment.urlServicios+"tienda/detalleTienda/"+idtienda);
    //return this.http.get<any>("assets/tiendaOne.json");
  }


  getIdRubroTienda(){
    switch(name){
      case 'Restaurantes': return 1;
      case 'Cafeterías': return 2;
      case 'Market' : return 3;
      case 'Farmacias' : return 4;
      case 'Otros' : return 5;
      case 'Ropa y Calzado' : return 6;
    }
  }
}
