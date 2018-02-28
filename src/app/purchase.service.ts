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
    if (date.day === undefined || date.day === null) {
      date.day = 1;
    }
    date = `${date.year}-${date.month}-${date.day}`;
    this.api.getPurchases(date);
  }

  deletePurchase(purchaseId) {
    this.api.deletePurchase(purchaseId);
  }

  updatePurchase(data, id) {
    this.api.updatePurchase(data, id);
  }

}
