import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  modalRef: NgbModalRef;

  budgetCategories: string[] = [
    'Rent',
    'Food',
    'Utilities',
    'Fun'
  ]
  budgetEntries;
  purchases;
  name = new FormControl('', Validators.required);

  purchaseform: FormGroup;

  constructor(
    private purchaseService: PurchaseService,
    private modalService: NgbModal,
    private apiService: ApiService
  ) { 
    apiService.budgetEntries$.subscribe(
      budgetEntries => {
        this.budgetCategories = (budgetEntries as any).categories;
        console.log('budget categories are ', this.budgetCategories)
      }
    )

    apiService.purchases$.subscribe(
      purchases => {
        this.purchases = (purchases as any).purchases;
        console.log('purchases are ', this.purchases);
      }
    )
  }

  ngOnInit() {
    this.purchaseform = new FormGroup({
      name: this.name,
      total: new FormControl(),
      date: new FormControl(),
      category: new FormControl()
    });
    this.apiService.getBudgetCategories();
    this.onGetPurchases();
  }

  onNewPurchase() {
    console.log('form submitted', this.purchaseform.value);
    let data = this.purchaseform.value;
    this.purchaseform.reset();
    this.modalRef.close()
    this.purchaseService.newPurchase(data)
  }

  open(content) {
    console.log('open modal', content);
    this.modalRef = this.modalService.open(content)
  }

  onGetPurchases() {
    this.purchaseService.getPurchases();
  }

  deletePurchase(purchaseId) {
    console.log('purchase id is ', purchaseId);
    this.purchaseService.deletePurchase(purchaseId);
  }

}
