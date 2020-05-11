import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  getProducto(idproducto:number): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"productoOne");
    return this.http.get<any>("assets/productoOne.json");
  }

  getListProductos(): Observable<any>{
    return this.http.get<any>("assets/producto.json");
  }


}
