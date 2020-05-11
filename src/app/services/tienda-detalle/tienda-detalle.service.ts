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
    //return this.http.get<any>(environment.urlServicios+"tiendaOne");
    return this.http.get<any>("assets/tiendaOne.json");
  }
}
