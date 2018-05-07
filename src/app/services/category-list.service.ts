import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryListService {

private categoryListRef = this.db.list<Category>('category-list');

  constructor(private db: AngularFireDatabase){ }

  getCategoryList(){
    return this.categoryListRef;
  }

  addCategory(category: Category){
    return this.categoryListRef.push(category);
  }
}
