import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../app/services/user.service';
import { AuthService } from '../../../app/services/auth.service';
import { SharedService } from '../../../app/services/shared.service';
import { NewAddressPage } from './new-address/new-address';
import { AngularFireList } from 'angularfire2/database';
import { UserAddresses } from '../../../app/models/user/user-addresses.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
  providers: [AuthService,UserService,SharedService]
})
export class BillingPage {

  addressForm: FormGroup;

  community: any;
  address: any;
  //addresses: AngularFireList<UserAddresses>;
  delivery_details: string;
  addressList$: Observable<UserAddresses[]>;

  communities = ['PPC', 'PPH', 'PPG'];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    fb: FormBuilder,

    //public cartService: CartService,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public userService: UserService,
    public sharedService: SharedService
   ) {
    //this.payment_mode="cod";
    this.delivery_details = "";
    this.address = navParams.data;
    //this.userService.loadDeliveyAddress(this.authService.getLoggedUID());
    //this.addresses = this.userService.deliveryAddresses;
    //console.log('Address: ' + JSON.stringify(this.addresses));

    this.getAddressList();
  }

  getAddressList(){
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

  addAddress() : void{
    this.addressManipulation(false,null);
  }

  editAddress(address: any) : void{
    //this.addressManipulation(true, address);
    this.navCtrl.push(NewAddressPage, {address: address});
  }

  deleteAddress(address:any) : void{
    let confirm = this.alertCtrl.create({
      title: 'Delete this Address',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.removeAddress(this.authService.getLoggedUID(),address.$key);
          }
        }
      ]
    });
    confirm.present();
  }

  addressManipulation(edit:boolean, address :any) : any {

    let data = this.addressForm.value;

    if (!data.name || !data.houseNum || !data.phone || !data.community ) {
      this.sharedService.showToast("Invalid Data!");
      event.stopPropagation(); //TODO
    } else {

      if(edit){
          this.userService.updateAddress(this.authService.getLoggedUID(), data, address.$key);
      }else{
          this.userService.addAddress(this.authService.getLoggedUID(),data);
      }
    }
  }

  addNewAddress(){
    this.navCtrl.push(NewAddressPage);
  }

  makeDefaultAddress(address: any){
    address.default = true;
    this.userService.updateAddress(this.authService.getLoggedUID(), address, address.$key);
    return;
  }

 }
