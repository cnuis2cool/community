import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../../app/services/user.service';
import { AuthService } from '../../../../app/services/auth.service';
import { SharedService } from '../../../../app/services/shared.service';


@Component({
  selector: 'page-address',
  templateUrl: 'new-address.html',
  providers: [AuthService,UserService,SharedService]
})
export class NewAddressPage {

  addressForm: FormGroup;

  community: any;
  addresses: any;
  defaultAddress: boolean;
  address: any;

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
    //this.delivery_details="";

    this.address = navParams.data.address;
    this.userService.loadDeliveyAddress(this.authService.getLoggedUID());
    this.addresses = this.userService.deliveryAddresses;
    this.defaultAddress = true;

    this.addressForm = fb.group({
      default: [''],
      houseNum: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      community: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    if (this.address)
      this.initialize(this.address);
  }

  initialize(address: any){
    this.community = address.community;
    this.defaultAddress = address.default;

    this.addressForm.patchValue({
      name: address.name,
      houseNum: address.houseNum,
      phone: address.phone
    });
  }

  addAddress() : void{
    this.addressManipulation(false,null);
  }

  editAddress(address: any) : void{
    this.addressManipulation(true, address);
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

      this.navCtrl.pop();
    }
  }

 }
