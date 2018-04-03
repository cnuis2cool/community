import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: './orders.html'
})

// export class NavigationDetailsPage {
//   item;

//   constructor(params: NavParams) {
//     this.item = params.data.item;
//   }
// }

export class OrdersPage {

  constructor(public navCtrl: NavController) {

  }

  openNavDetailsPage() {
    this.navCtrl.push('CheckoutPage');
  }

}
