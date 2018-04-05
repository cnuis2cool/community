import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Address2Page } from '../address/address';

@Component({
  templateUrl: './schedule.html'
})
export class Schedule2Page {
  delTime: string = "puppies";

  public event = {
    dateStart: '2018-04-01',
    timeStarts: '08:00',
    dateEnd: '2018-04-20'
  }

  constructor(public nav: NavController) {

  }

  //@HostBinding('class.is-open')
  //isOpen = false;

  // toggle() {
  //   this.isOpen = !this.isOpen;
  // }

  pushPage() {
    this.nav.push(Address2Page);
  }

}