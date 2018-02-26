import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class BudgetService {

  constructor(private api: ApiService) { }

  newCategory(category) {
    if (category.interval === 'Daily') {
      category.amount = category.amount * 30
      category.interval = 'Monthly'
    } else if (category.interval === 'Weekly') {
      category.amount = category.amount * 4
      category.interval = 'Monthly'
    } else if (category.interval === 'Yearly') {
      category.amount = category.amount / 12
      category.interval = 'Monthly'
    }
    console.log('Final budget service category is ', category)
    this.api.createCategory(category);
  }

  getBudgetCategories() {
    this.api.getBudgetCategories();
  }

  deleteCategory(categoryId) {
    this.api.deleteCategory(categoryId);
  }

  updateCategory(data, id) {
    this.api.updateCategory(data, id);
  }

}
