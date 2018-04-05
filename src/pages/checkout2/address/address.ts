import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Delivery2Page } from '../delivery/delivery';

@Component({
  templateUrl: './address.html'
})
export class Address2Page {
  constructor(public nav: NavController) {

  }

  pushPage() {
    this.nav.push(Delivery2Page);
  }

}
