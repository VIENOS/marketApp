import { Injectable } from '@angular/core';
import { Tienda } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubroTiendasService {


  public paginax:number=0;
  public tiendas: Tienda[] = [];
  constructor(private http: HttpClient) { }

  getTienda(idzona:any,idrubro:any,idsubcategoria:any){
    let promesa = new Promise( (resolve, reject) => {
      //let url = environment.urlServicios+"tiendas/"+idzona+"/"+idrubro+"/"+idsubcategoria+"/"+ this.paginax;
      let url = "assets/tiendas"+ this.paginax+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.paginax = this.paginax+1;
            resolve();
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;
  }


  getTiendaSearch(idzona:any,idrubro:any,termsearch:any){
    console.log("COMENZAMOS A BUSCAR")
    let promesa = new Promise( (resolve, reject) => {
         //let url = environment.urlServicios+"tiendas/"+idzona+"/"+idrubro+"/"+termsearch+"/"+ this.paginax;
      let url = "assets/tiendas"+ this.paginax+".json";
      this.http.get(url).subscribe( 
          data => { 
              console.log(data)
              let lsttiendas = data as Tienda[]
              this.tiendas.push( ...lsttiendas);  
              console.log(this.tiendas)
              this.paginax = this.paginax+1;
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
