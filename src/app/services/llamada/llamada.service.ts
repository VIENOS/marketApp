import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LlamadaService {
  paginaofe:number=0;
  public lstofertas: any[] = [];
  public zonaId :any;
  constructor(private storage:Storage,private http:HttpClient) { }

  getOfertas(idzona:any){
    console.log("OFERTAS")
   
    let promesa = new Promise( (resolve, reject) => {
      console.log("ofertas/ofertas/"+idzona+"/"+ this.paginaofe)
      let url = environment.urlServicios+"ofertas/ofertas/"+idzona+"/"+ this.paginaofe;
      //let url = "assets/ofertas"+ this.paginaofe+".json";
      this.http.get(url).subscribe( 
          (data:any) => { 
              console.log(data)
              if(!data.msg){
                let lst = data as any[]
                const arrTemp = [ ...this.lstofertas, ...lst];
                this.lstofertas = arrTemp; 
                console.log("LSTOFER = "+this.lstofertas)
                this.paginaofe = this.paginaofe+1;
              resolve();
              }else{
                resolve();
              }
             
          } ,
          error=>{
            resolve();
          }
          );
    });
    return promesa;

  }

 

}
