import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LlamadaService {
  paginaofe:number=0;
  public lstofertas: Producto[] = [];
  constructor(private http:HttpClient) { }

  getOfertas(){
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"ofertas/"+idzona+"/"+ this.pagina;
      let url = "assets/ofertas"+ this.paginaofe+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lst = data as Producto[]
              const arrTemp = [ ...this.lstofertas, ...lst];
              this.lstofertas = arrTemp; 
              console.log("LSTOFER = "+this.lstofertas)
              this.paginaofe = this.paginaofe+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;

  }
}
