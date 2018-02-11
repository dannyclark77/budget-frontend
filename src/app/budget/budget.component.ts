import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  modalRef: NgbModalRef;
  budgetform: FormGroup;

  constructor(
    private modalService: NgbModal,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.budgetform = new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    })
  }

  onNewCategory() {
    console.log('form submitted', this.budgetform.value);
    let data = this.budgetform.value;
    console.log('data is ', data);
    this.budgetform.reset();
    this.modalRef.close();
    this.budgetService.newCategory(data);
  }

  open(content) {
    console.log('open modal', content);
    this.modalRef = this.modalService.open(content);
  }

}
