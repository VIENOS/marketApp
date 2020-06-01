import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private router: Router,
              private callNumber: CallNumber) { }

  ngOnInit() {
  }

  call(){
    console.log("entró a llamar()");
    this.callNumber.callNumber("944936298",true);
    console.log("salió de llamar()");
    
  }

  gotoLlamada(){
    this.router.navigateByUrl('/tabs/llamada')
  }

}
