import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tienda } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  
  pagina:number=0;
  public tiendas: Tienda[] = [];
  constructor(private http: HttpClient) { }

  getTiendaRecomendada(){
    return this.http.get<any>("assets/tiendas0.json");
  }


  getTiendaRecomendada1(){
    return this.http.get<any>("assets/tiendas1.json");
  }

  getTienda(){
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"tiendas"+ this.pagina;
      let url = "assets/tiendas"+ this.pagina+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.pagina = this.pagina+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;
  }


  getZonas(): Observable<any>{
    //return this.http.get<any>(environment.urlServicios+"lstcategorias");
    return this.http.get<any>("assets/zonas.json");
  }


}
