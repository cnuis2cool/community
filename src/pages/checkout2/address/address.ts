import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Delivery2Page } from '../delivery/delivery';

import { Storage } from '@ionic/storage';
import { UserService } from '../../../app/services/user.service';
import { AuthService } from '../../../app/services/auth.service';
import { UserAddresses } from '../../../app/models/user/user-addresses.model';
import { Observable } from 'rxjs/Observable';
import { ConfirmPage } from '../confirm/confirm';

@Component({
  templateUrl: './address.html',
  providers: [AuthService,UserService]
})

export class Address2Page {

  deliveryType: string;
  addressList$: Observable<UserAddresses[]>;
  selectedAddress: any;

  constructor(public nav: NavController,
    private storage: Storage,
    public userService: UserService,
    public authService: AuthService) {

    this.storage.get('delivery-type-selected').then((data) => {
      this.deliveryType = data;
    });

    this.getAddressList();
  }

  getAddressList() {
    this.addressList$ = this.userService
    .getDeliveryAddressList(this.authService.getLoggedUID())  // DB List
    .snapshotChanges()  // Key & Value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

  addressChanged(change) {
    console.log(change);
  }


  pushPage() {
    this.nav.push(ConfirmPage, {'address': this.selectedAddress});
  }

}
