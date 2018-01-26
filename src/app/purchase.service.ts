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

}
