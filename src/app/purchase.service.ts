import { Injectable } from '@angular/core';
import { ApiService } from './api.service';



@Injectable()
export class PurchaseService {

  constructor(
    private api: ApiService
  ) { }

  newPurchase(data) {
    this.api.createPurchase(data)
  }

  getPurchases(date) {
    console.log('purchase service date is ', date);
    if (date.day === undefined || date.day === null) {
      date.day = 1;
    }
    console.log('new purchase service date is ', date);
    date = `${date.year}-${date.month}-${date.day}`;
    console.log('interpolated date is ', date);
    this.api.getPurchases(date);
  }

  deletePurchase(purchaseId) {
    this.api.deletePurchase(purchaseId);
  }

  updatePurchase(data, id) {
    this.api.updatePurchase(data, id);
  }

}
