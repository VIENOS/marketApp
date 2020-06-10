import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Datos } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

   getPolitica(): Observable<any>{
    return this.http.get<any>(environment.urlServicios+"carrito/politicas");
   // return this.http.get<any>("assets/politicas.json");
  }

  nuevoPedido(request): Observable<any>{
    return this.http.post<any>(
      environment.urlServicios+"carrito/nuevoPedido",
      JSON.stringify(request),).pipe(map((response: any) => response),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      }
     )
    );
}


getListPedidos(datos:Datos){
  return this.http.get<any>(environment.urlServicios+"pedidos/pedidos/"+datos.email+"/"+datos.celular);
   //return this.http.get<any>("assets/pedidos.json");
}



  
}
