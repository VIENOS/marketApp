import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/interfaces/interfaces';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public idProducto:number;
  public producto:Producto;

  constructor(private _servcio_producto:ProductoService,private activatedRoute: ActivatedRoute,private router:Router,private modalCtrl: ModalController,private navParams: NavParams) { }

  ngOnInit() {
    this.idProducto = this.navParams.get('id');
    this.getProducto(this.idProducto);
    console.log("ID = "+this.idProducto);
  }



  getProducto(idproducto:number){
    this._servcio_producto.getProducto(idproducto).subscribe(
      res=>{
         this.producto = res as Producto;
         console.log(res)
     }   
    );
  }

  close(){
    this.modalCtrl.dismiss();
  }

 

}
