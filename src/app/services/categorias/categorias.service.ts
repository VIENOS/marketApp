import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getListaCategorias(): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"lstcategorias");
    return this.http.get<any>("assets/lstcategorias.json");
  }

  getRecomendados(): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"lstcategorias");
    return this.http.get<any>("assets/recomendados.json");
  }
}
