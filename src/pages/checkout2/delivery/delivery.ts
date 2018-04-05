import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';

@Component({
  templateUrl: './delivery.html'
})
export class Delivery2Page {
  constructor(public nav: NavController) {

  }

  pushPage() {
    this.nav.push(ConfirmPage);
  }
}
