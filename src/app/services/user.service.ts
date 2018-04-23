import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';
import { UserAddresses } from '../models/user/user-addresses.model';

@Injectable()
export class UserService {

  deliveryAddresses: AngularFireList<UserAddresses>;

  constructor(public db: AngularFireDatabase) {}

  loadDeliveyAddress(userid : string)  {
     this.deliveryAddresses = this.db.list<UserAddresses>(`user/${userid}/address`);
  };

  getDeliveryAddressList(userid : string){
    return this.db.list<UserAddresses>(`user/${userid}/address`);
  }

  addAddress(userid : string, address : any){

    this.loadDeliveyAddress(userid);
    this.deliveryAddresses.push(address);
  };

  removeAddress(userid : string, addressId : string){
    this.loadDeliveyAddress(userid);
    this.deliveryAddresses.remove(addressId).then(_ => console.log('item removed!'));
  };

  // updateAddress(userid : string, address : any , addressKey : string ){

  //   this.db.object(`customer/${userid}/address/${addressKey}`, {preserveSnapshot:true} ).first().subscribe(data => {
  //     if(data.val() !== null) {
  //         this.deliveryAddresses.update(addressKey , address);
  //     }else{
  //         console.log('No such element');
  //     }
  //   });
  // };

  // TODO - Not working
  updateAddress(userid : string, address : any , addressKey : string): void {
    this.loadDeliveyAddress(userid);
    this.deliveryAddresses.update(addressKey, address).catch(error => this.handleError(error));
    //this.deliveryAddresses.update(addressKey, address).catch(error => this.handleError(error));

  }

  private handleError(error) {
    console.log(error);
  }

}
