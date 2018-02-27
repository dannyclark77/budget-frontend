import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';

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

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    apiService.budgetEntries$.subscribe(
      budgetEntries => {
        this.budgetEntries = (budgetEntries as any).categories;
        if (this.interval === 'Daily') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount / 30).toFixed(2);
          });
        }
        if (this.interval === 'Weekly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount / 4).toFixed(2);
          });
        }
        if (this.interval === 'Yearly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount * 12).toFixed(2);
          });
        }
        if (this.interval === 'Monthly') {
          this.budgetEntries.forEach(entry => {
            entry.amount = (entry.amount * 1).toFixed(2);
          })
        }
      }
    )

    budgetService.date$.subscribe(
      date => {
        this.date = date;
        console.log('budget component date is ', this.date);
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
  }

}
