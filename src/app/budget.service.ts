import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class BudgetService {

  constructor(private api: ApiService) { }

  newCategory(category) {
    console.log('got to budget service ', category);
    this.api.createCategory(category);
  }

  getBudgetCategories() {
    this.api.getBudgetCategories();
  }

  deleteCategory(categoryId) {
    this.api.deleteCategory(categoryId);
  }

}
