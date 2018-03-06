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

  getPurchases(startdate, enddate) {
    if (enddate.day === undefined || enddate.day === null) {
      enddate.day = 1;
    }
    console.log('purchase service dates are ', startdate, enddate);
    startdate = `${startdate.year}-${startdate.month}-${startdate.day}`;
    enddate = `${enddate.year}-${enddate.month}-${enddate.day}`;    
    this.api.getPurchases(startdate, enddate);
  }

  deletePurchase(purchaseId) {
    this.api.deletePurchase(purchaseId);
  }

  updatePurchase(data, id) {
    this.api.updatePurchase(data, id);
  }

}
