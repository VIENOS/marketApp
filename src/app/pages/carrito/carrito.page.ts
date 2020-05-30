import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { InicioService } from 'src/app/services/inicio/inicio.service';
import { IonList, ModalController, AlertController, NavController } from '@ionic/angular';
import { PedidoPage } from '../pedido/pedido.page';
import { ProductoCont, Tienda } from 'src/app/interfaces/interfaces';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CalculosService } from 'src/app/services/calculos/calculos.service';
import { TiendaService } from 'src/app/services/tienda/tienda.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  @ViewChild('list',{static: false}) list: IonList;
  lstproduct :ProductoCont[]=[];
  cupon:any;
  msgxCupon:string;
  cuponValido:boolean;
  tipoPago:any;
  lstTipoPago:any;
  habilitarpago:boolean;
  messagepago:any;
  montoPedido ="0.00";
  montoDelivery="0.00";
  montoTotal="0.00";
  


  constructor(private _servicio_tienda:TiendaService,private navCtrl:NavController,
    private _servcio_producto:ProductoService,private _service_inicio:InicioService, public viewCtrl: ModalController,public alertController: AlertController,public _servicio_carrito:CarritoService,private _servicioCalculos:CalculosService) {
      this.cuponValido=false;
      this.cupon="";
      this.habilitarpago=false;
      this._servicio_carrito.cargarCarrito();
      this._servicio_carrito.longCarrito();
   }

  ngOnInit() {
  
    this.loadListPagos();
    this.getCalculos( this._servicio_carrito.carrito,this.cupon)
  }

  getCalculos(carrito:ProductoCont[],cupon:any){
     let request = {
       "cupon" : cupon,
       "distanciakm" : '',
       "carrito" : carrito
     };

     console.log("REQUEST = "+JSON.stringify(request))
    this._servicioCalculos.calculosMontosCarrito(request).subscribe(
      res => {
           console.log("RESPONSE CALUCL CARRITO = "+JSON.stringify(res))
            this.montoPedido = res.totalPedido;
            this.montoDelivery = res.totalDelivery;
            this.montoTotal = res.montoTotal;
      },
      error => {
        
      }
    );
  }


  
  loadListPagos(){
    this._servcio_producto.getListTipoPagos().subscribe(
      res=>{
         this.lstTipoPago = res;
       //  this.tipoPago = this.lstTipoPago[0];
        console.log(res);
     }   
    );
  }
  




eliminarProducto(item:any){
  console.log(item)
  this._servicio_carrito.borrarItemDeCarrito(item.producto.id);
  console.log("LLAMAR SERVCIO CALCULOS ITEM ");
  this.getCalculos(this._servicio_carrito.carrito,this.cupon);
}


cuponValidar(){
    
  let request = {
    "cupon" : this.cupon,
    "distanciakm" : '',
    "carrito" : this._servicio_carrito.carrito
  };

  console.log("REQUEST CON CUPON = "+JSON.stringify(request))
   this._servicioCalculos.calculosMontosCarrito(request).subscribe(
   res => {
    console.log("RESPONSE CALUCL CARRITO = "+JSON.stringify(res))
        this.montoPedido = res.totalPedido;
        this.montoDelivery = res.totalDelivery;
        this.montoTotal = res.montoTotal;
        this.cuponValido = res.cuponValido;
        if(this.cuponValido ){
          this.msgxCupon="Cupon aplicado con exito";
        }else{
          this.msgxCupon="El cupon es invalido";
        }
   },
   error => {
     
   }
 );
}

openPedido(){
  //this.router.navigate(["/categorias/",categoria.id]);
  let request = {
    "cupon" : this.cupon,
    "distanciakm" : '',
    "carrito" : this._servicio_carrito.carrito
  };

  this._servicio_tienda.getValidarTiendaTraerCoordenadas(request).subscribe(
    res => {
          console.log("corrdeandas tienda = "+JSON.stringify(res))
         this.abrirModalPedido(res.latitud,res.longitud);
    },
    error => {
           this.errorTienda();
    }
  );

}

async abrirModalPedido(latitud:any,longitud:any){
const myModal = await this.viewCtrl.create({
  component:PedidoPage,
  componentProps:{latitudtienda:latitud,longitudtienda:longitud,tipopago:this.tipoPago.nombre,
                  totalpedido:this.montoPedido, totaldelivery:this.montoDelivery,
                  montoTotal: this.montoTotal, cupon: this.cupon}
});
await myModal.present();
const {data} = await myModal.onDidDismiss();
  console.log(data["cerrar"])
  if(data["cerrar"]){
    console.log(data["cerrar"])
    document.getElementById("cerrarcarro").click();
    this.navCtrl.pop();
   // document.getElementById("carrito").click();
  }
}

OnChange($event){
    if(this.tipoPago!==undefined && this.tipoPago.id===0){
      this.habilitarpago = false;

      return;
    }

    if(this.tipoPago.id===1){
         this.messagepago="Debe asegurarse tener el dinero exacto por medidas de precaucion"
    }else{
      if(this.tipoPago.id===2){
        this.messagepago="el motorizado llevara la maquina procesadora de tarjetas"
      }
    }
   this.presentAlertConfirm();
}


async presentAlertConfirm() {
  const alert = await this.alertController.create({
    mode:'ios',
    header: 'Aviso',
    message: this.messagepago,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          console.log('Confirm Okay');
          console.log("CAMIO TIPO")
          this.habilitarpago = this.tipoPago!=undefined && this.tipoPago.id !=0 ? true : false; 
          console.log("HABILITADO = "+this.habilitarpago)
        }
      }
    ]
  });

  await alert.present();
}


openPolitica(){
  this.presentAlertConfirm();
}

close(){
  console.log("VA A CERRAR?")
  this.viewCtrl.dismiss();
}





sumarCantidad(id:any){
  let pos = this._servicio_carrito.carrito.findIndex(p=> p.producto.id === id);
   this._servicio_carrito.carrito[pos].cantidad =   this._servicio_carrito.carrito[pos].cantidad + 1  ;
   this._servicio_carrito.editarCarrito(this._servicio_carrito.carrito);
   this.getCalculos(this._servicio_carrito.carrito,this.cupon);

  }

restarCantidad(id:any){
  let pos = this._servicio_carrito.carrito.findIndex(p=> p.producto.id === id);
  if(this._servicio_carrito.carrito[pos].cantidad<=1){
    return;
  }
  this._servicio_carrito.carrito[pos].cantidad =   this._servicio_carrito.carrito[pos].cantidad - 1  ;
  this._servicio_carrito.editarCarrito(this._servicio_carrito.carrito);
  this.getCalculos(this._servicio_carrito.carrito,this.cupon);
}



async errorTienda() {
  const alert = await this.alertController.create({
    mode:'ios',
    header: 'Error',
    message:'los productos seleccionados, perteneces a distintas tiendas, se requiere solo productos de una sola tienda',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
          
        }
      }, {
        text: 'Aceptar',
        handler: () => {
       
        }
      }
    ]
  });

  await alert.present();
}

}
