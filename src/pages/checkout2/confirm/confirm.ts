import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Schedule2Page } from '../schedule/schedule';

@Component({
  templateUrl: './confirm.html'
})

export class ConfirmPage {
    constructor(public nav: NavController) {

    }

    goBack() {
        this.nav.setRoot(Schedule2Page);
    }
}
