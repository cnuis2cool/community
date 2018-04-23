import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: './offers.html'
})
export class OffersPage {

  flashCards = [];

  constructor(public navCtrl: NavController) {
    this.flashCards = [
      {
        front: { image: './assets/img/offers/offer1.jpg', title: '15% Off on Veggies', subtitle: '' },
        back: {
          title: '15% Off on Veggies',
          subtitle: 'Hello, Greetings, I bless the divine in you',
          content: 'It is used to greet people every time they meet. It is usually initiated by the juniors'
        }
      },
      {
        front: {
          image: './assets/img/offers/offer2.jpg',
          title: '10% Off on Milk',
          subtitle: ''
        },
        back: {
          title: 'meaning',
          subtitle: '',
          content: 'It is used to ask people how they are doing or feeling.'
        }
      },
      {
        front: {
          image: './assets/img/offers/offer3.jpeg',
          title: '15% Off on Veggies',
          subtitle: ''
        },
        back: {
          title: '15% Off on Veggies',
          subtitle: '',
          content: 'It is used to ask for forgiveness when you do make mistakes.'
        }
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlashCardPage');
  }

}
