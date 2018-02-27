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
  ];
  purchases;
  formData: any;
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
      }
    )

    apiService.purchases$.subscribe(
      purchases => {
        this.purchases = (purchases as any).purchases;
        this.purchases.forEach(purchase => {
          purchase.total = (purchase.total * 1).toFixed(2)
        });
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
    let data = this.purchaseform.value;
    this.purchaseform.reset();
    this.modalRef.close()
    this.purchaseService.newPurchase(data)
  }

  open(modal, data) {
    this.purchaseform.reset();
    this.formData = data;
    this.modalRef = this.modalService.open(modal)
  }

  onGetPurchases() {
    this.purchaseService.getPurchases();
  }

  deletePurchase(purchaseId) {
    this.purchaseService.deletePurchase(purchaseId);
  }

  onUpdatePurchase() {
    let data = this.purchaseform.value;
    this.purchaseform.reset();
    this.modalRef.close();
    this.purchaseService.updatePurchase(data, this.formData.id);
  }

}
