import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/';
import { FormGroup, FormControl } from '@angular/forms';

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

  purchaseform: FormGroup;

  constructor(
    private purchaseService: PurchaseService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.purchaseform = new FormGroup({
      name: new FormControl(),
      total: new FormControl(),
      date: new FormControl(),
      category: new FormControl()
    })
  }

  onNewPurchase() {
    console.log('form submitted', this.purchaseform.value);
    this.purchaseform.reset();
    this.modalRef.close()
    // this.purchaseService.newPurchase(data)
  }

  open(content) {
    console.log('open modal', content);
    this.modalRef = this.modalService.open(content)
  }

}
