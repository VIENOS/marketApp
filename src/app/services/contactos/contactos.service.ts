import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private http:HttpClient) { }

  getMotorizado(id:any){
    return this.http.get<any>(environment.urlServicios+"pedidos/detallePedidos/"+id);
    // return this.http.get<any>("assets/pedido.json");
  }

  finalizarPedido(request): Observable<any>{
    return this.http.post<any>(
      environment.urlServicios+'pedidos/finalizarPedido',
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
  
}
