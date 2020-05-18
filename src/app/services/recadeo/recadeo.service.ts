import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecadeoService {




  constructor(private http: HttpClient) { }

 /**
     * Ajuste decimal de un número.
     *
     * @param {String}  tipo  El tipo de ajuste.
     * @param {Number}  valor El numero.
     * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
     * @returns {Number} El valor ajustado.
     */
    decimalAdjust(type, value, exp) {
      // Si el exp no está definido o es cero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value; //12.365
      exp = +exp; //2
      // Si el valor no es un número o el exp no es un entero...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Shift verifica si contiene la e
      value = value.toString().split('e');
      //la e corre el decimal hacia la derecha ejm: si es 12.365 + e + 2  = 12.365e2 = 1236.5 
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
      //redondeado el value = 1237
      // Shift back
      value = value.toString().split('e');
      // agrega e al value = 1237e2  el -2 es el "exp" esto quiere decir que a la izquierda retro todo esto es igual a 12.37
      return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }


     /**
     * Funcion a la cual se hace el llamado para poder hacer el redondeo esta incluye el metodo decimalAdjust
     *
     * @param {Number}  valor El numero.
     * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base)..
     * @returns {Number} El valor ajustado.
     */
    round(value,exp){
            if(value===0){
              return 0;
            }else{
              return this.decimalAdjust('round', value, exp); 
            }
    }






}
