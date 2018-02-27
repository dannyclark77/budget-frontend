import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable()
export class BudgetService {

  private date = new Subject();
  date$ = this.date.asObservable();

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

  newDate(date) {
    if (date !== undefined) {
      this.date.next(date);
    }
  }

}
