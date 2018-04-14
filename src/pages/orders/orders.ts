import { Component, Input, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: './orders.html'
})

export class OrdersPage {

  constructor(private navCtrl: NavController, public storage: Storage) {

  }

  openNavDetailsPage() {
    this.navCtrl.push('Checkout2Page');
  }

  // storage.set('name', 'Max');

  // storage.get('age').then((val) => {
  //   console.log('Your age is', val);
  // });



}
