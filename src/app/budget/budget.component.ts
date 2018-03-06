import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';
import { PurchaseService } from '../purchase.service';
import { PercentPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  modalRef: NgbModalRef;
  budgetform: FormGroup;
  budgetEntries;
  formData: any;
  name = new FormControl('', Validators.required);
  interval = 'Monthly';
  date;
  now = new Date();
  purchases;
  startDate;
  endDate;
  purchaseCategoryTotals = {};

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetService,
    private apiService: ApiService,
    private messageService: MessageService,
    private purchaseService: PurchaseService
  ) {
    apiService.budgetEntries$.subscribe(
      budgetEntries => {
        this.budgetEntries = (budgetEntries as any).categories;
        if (this.interval === 'Daily') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount / 30).toFixed(2);
          });
        } else if (this.interval === 'Weekly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount / 4).toFixed(2);
          });
        } else if (this.interval === 'Yearly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount * 12).toFixed(2);
          });
        } else if (this.interval === 'Monthly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount * 1).toFixed(2);
          })
        }
      }
    )

    budgetService.date$.subscribe(
      date => {
        this.date = date;
        this.setRange();
      }
    )

    apiService.purchases$.subscribe(
      purchases => {
        this.purchases = (purchases as any).purchases;
        console.log('budget purchases is ', this.purchases);
        this.purchaseCategoryTotals = {};
        this.purchases.forEach(purchase => {
          if (!this.purchaseCategoryTotals[purchase.category.name]) {
            this.purchaseCategoryTotals[purchase.category.name] = purchase.total * 1;
          } else {
            this.purchaseCategoryTotals[purchase.category.name] += (purchase.total * 1);
          }
        });
      }
    )
  }

  ngOnInit() {
    this.budgetform = new FormGroup({
      name: this.name,
      amount: new FormControl(),
      interval: new FormControl()
    });
    this.onGetBudgetCategories();
    this.date = { year: this.now.getFullYear(), month: this.now.getMonth() + 1 };
    this.setRange();
  }

  onNewCategory() {
    let data = this.budgetform.value;
    console.log('data is ', data);
    if (data.name === null || data.amount === null || data.interval === null) {
      this.messageService.addMessage('danger', 'Please fill in all form fields', 2000);
    } else {
      this.budgetform.reset();
      this.modalRef.close();
      this.budgetService.newCategory(data);
    }
  }

  open(modal, data) {
    this.budgetform.reset();
    this.formData = data;
    console.log('form data is ', this.formData);
    this.modalRef = this.modalService.open(modal);
  }

  onGetBudgetCategories() {
    this.budgetService.getBudgetCategories();
  }

  deleteCategory(entryId) {
    this.budgetService.deleteCategory(entryId);
  }

  onUpdateCategory() {
    let data = this.budgetform.value;
    this.budgetform.reset();
    this.modalRef.close();
    this.budgetService.updateCategory(data, this.formData.id);
  }

  setInterval(interval) {
    this.interval = interval;
    this.onGetBudgetCategories();
    this.setRange();
  }

  setRange() {
    if (this.interval === 'Daily') {
      this.startDate = this.date;
      this.endDate = this.date;
    } else if (this.interval === 'Weekly') {
      this.setWeeklyRange();
    } else if (this.interval === 'Monthly') {
      this.startDate = { year: this.date.year, month: this.date.month, day: 1 };
      let lastDayOfMonth = new Date(this.date.year, this.date.month, 0).getDate();
      this.endDate = { year: this.date.year, month: this.date.month, day: lastDayOfMonth };
    } else if (this.interval === 'Yearly') {
      this.startDate = { year: this.date.year, month: 1, day: 1 };
      this.endDate = { year: this.date.year, month: 12, day: 31 };
    }
    this.purchaseService.getPurchases(this.startDate, this.endDate);
  }

  setWeeklyRange() {
    let numDay = new Date(this.date.year, this.date.month - 1, this.date.day).getDay();
    if (this.date.day - numDay < 1) {
      let newNum = numDay - this.date.day
      let sdate = new Date(this.date.year, this.date.month - 1, 0 - newNum);
      this.startDate = { year: sdate.getFullYear(), month: sdate.getMonth() + 1, day: sdate.getDate() }
    } else {
      this.startDate = { year: this.date.year, month: this.date.month, day: this.date.day - numDay };
    }
    let edate = new Date(this.date.year, this.date.month, 0);
    let newNum = 6 - numDay - (edate.getDate() - this.date.day);
    if (newNum > 0 && edate.getMonth() !== 11) {
      this.endDate = { year: this.date.year, month: this.date.month + 1, day: newNum };
    } else if (newNum > 0 && edate.getMonth() === 11) {
      this.endDate = { year: this.date.year + 1, month: 1, day: newNum }
    } else {
      this.endDate = { year: this.date.year, month: this.date.month, day: this.date.day + 6 - numDay };
    }
  }

}
