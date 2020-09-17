import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto, ProductoCont } from 'src/app/interfaces/interfaces';
import { ModalController, NavParams } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public idProducto:number;
  public producto:Producto;

  constructor(public service_carrito:CarritoService, private _servcio_producto:ProductoService,private activatedRoute: ActivatedRoute,private router:Router,private modalCtrl: ModalController,private navParams: NavParams) { }

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


  addProducto(pruducto:any){
   /* console.log("add carrito " + JSON.stringify(this.producto));
    let productoCarrito = {
      "cantidad" : 1,
      "producto" : this.producto
    };
    this.service_carrito.guardarCarrito(productoCarrito); */
    
    let item = new ProductoCont();
    var idProductoString = pruducto.id;
    var idProductoNumber: number = +idProductoString;

    var precioString = pruducto.precio;
    var precioNumber: number = +precioString;

    var ofertaString = pruducto.oferta;
    var ofertaNumber: number = +ofertaString;

    pruducto.id = idProductoNumber;
    pruducto.precio = precioNumber;
    pruducto.oferta = ofertaNumber;
    
   item.producto = pruducto;
   item.cantidad = 1;
   this.service_carrito.guardarCarrito(item); 
    
  }
 

}
