import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { CategoryListService } from '../../app/services/category-list/category-list.service';
import { Category } from '../../app/models/category.model';
import { HomePage } from '../home/home';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-category',
  templateUrl: './category.html'
})
export class CategoryPage {
  categories: any [];
  item: Category;

  categoryList$: Observable<Category[]>;

  constructor(public navCtrl: NavController, private categoryService: CategoryListService) {

this.categoryList$ = this.categoryService
    .getCategoryList()  // DB List
    .snapshotChanges()  // Key & Value
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });

    this.categories = [
      {
        id: 'vegetables',
        name: 'Vegetables',
        image: './assets/img/category/vegetables.jpeg',
        description: 'Order for 100 get 5% off',
      },
      {
        id: 'fruits',
        name: 'Fruits',
        image: './assets/img/category/fruits.jpeg',
        description: 'Order for 100 get 10% off',
      },
      {
        id: 'milk',
        name: 'Milk',
        image: './assets/img/category/milk.jpeg',
        description: 'Order for 50 get 5% off',
      },
    ];

  }

  itemTapped(event, item) {
    this.navCtrl.push(ProductsPage, {
      'product': item
    });
  }

  addCategory(){
    this.item = {
      id: 'vegetables',
      name: 'Vegetables',
      image: './assets/img/category/vegetables.jpeg',
      description: 'Order for 100 get 5% off',
    };
    this.categoryService.addCategory(this.item).then(ref => {
      console.log(ref.key);
      this.navCtrl.setRoot(HomePage, { key: ref.key });
    });
  }

}
