import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../app/services/auth.service';
import { LoginPage } from '../login/login';
import { BillingPage } from './address/billing';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profilePicture: string;
  profileRef: any;
  errorMessage: any;
  placeholderPicture = 'https://api.adorable.io/avatar/200/bob';

  enableNotifications = true;
  language: any;
  currency: any;
  paymentMethod: any;

  languages = ['English', 'Portuguese', 'French'];
  paymentMethods = ['COD (Cash on Delivery)', 'Paytm', 'UPI'];
  currencies = ['USD', 'BRL', 'EUR'];

  user = {
    name: 'Marty Mcfly',
    imageUrl: 'assets/img/avatar/marty-avatar.png'
  };

  constructor(public navCtrl: NavController, private auth: AuthService) {
    this.user = {
      name: 'cnus',
      imageUrl: '',
    }
  }

  toggleNotifications() {
    // if (this.enableNotifications) {
    //   this.toastCtrl.create('Notifications enabled.');
    // } else {
    //   this.toastCtrl.create('Notifications disabled.');
    // }
  }

  updateImage(value) {
    this.profilePicture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage() {
    // this.camera.getPicture({
    //   quality: 50,
    //   allowEdit: true,
    //   cameraDirection: this.camera.Direction.FRONT,
    //   destinationType: this.camera.DestinationType.DATA_URL
    // }).then((imageData) => {
    //   this.user.imageUrl = imageData;
    // }, (err) => {
    //   this.toastCtrl.create('Error: ' + err);
    // });
  }

  logOut() {
    // this.alertService.presentAlertWithCallback('Are you sure?',
    //   'This will log you out of this application.').then((yes) => {
    //     if (yes) {
    //       this.toastCtrl.create('Logged out of the application');
    //     }
    //   });
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  deliveryClicked(){
    this.navCtrl.setRoot(BillingPage);
  }

}
