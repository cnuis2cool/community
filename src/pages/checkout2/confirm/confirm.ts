import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Schedule2Page } from '../schedule/schedule';
import { AngularFireList } from 'angularfire2/database';
import { Cart } from '../../../app/models/cart/cart.model';
import { CartService } from '../../../app/services/cart.service';
import { AuthService } from '../../../app/services/auth.service';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: './confirm.html',
  providers: [CartService]
})

export class ConfirmPage {

  public cartList: AngularFireList<Cart>;
  public cartItems: Observable<Cart[]>;
  selectedAddress: any;
  deliveryType: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private authService: AuthService,
    private cartService: CartService) {

    this.selectedAddress = this.navParams.get('address');

    this.storage.get('delivery-type-selected').then((data) => {
      this.deliveryType = data;
    });

    this.getCartList();
  }

  public getCartList(){

    this.cartList = this.cartService.getUserCartList(this.authService.getLoggedUID());

    this.cartItems = this.cartList.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

  goBack() {
      this.navCtrl.setRoot(Schedule2Page);
  }
}
