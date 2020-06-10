import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ThrowStmt } from '@angular/compiler';
import { LlamadaService } from 'src/app/services/llamada/llamada.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public numeroCel : any;

  constructor(private router: Router,
              private callNumber: CallNumber,
              public llamadaService:LlamadaService) { }

  ngOnInit() {
    this.getNumeroCel();
  }

  call(){
    console.log("entró a llamar()");
    this.callNumber.callNumber(this.numeroCel,true);
    console.log("salió de llamar()");
    
  }

  gotoLlamada(){
    this.router.navigateByUrl('/tabs/pedido');
  }

  getNumeroCel(){
    this.llamadaService.getNumCelular().subscribe(
      res => {
        this.numeroCel = res;
        console.log("numero CEL: " + JSON.stringify(this.numeroCel));
        
      }
    );
  }

}
