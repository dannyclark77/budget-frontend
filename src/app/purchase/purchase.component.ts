import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(
    private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
  }

  onNewPurchase(data) {
    this.purchaseService.newPurchase(data)
  }

}
