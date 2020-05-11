import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private http:HttpClient) { }

  getMotorizado(): Observable<any>{
    return this.http.get<any>("assets/motorizado.json");
  }
}
