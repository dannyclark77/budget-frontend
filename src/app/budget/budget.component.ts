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

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    apiService.budgetEntries$.subscribe(
      budgetEntries => {
        this.budgetEntries = (budgetEntries as any).categories;
        console.log('budget data is ', this.budgetEntries);
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

}
