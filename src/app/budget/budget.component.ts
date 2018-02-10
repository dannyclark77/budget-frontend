import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  modalRef: NgbModalRef;
  budgetform: FormGroup;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.budgetform = new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    })
  }

  onNewCategory() {
    console.log('form submitted', this.budgetform.value);
    this.budgetform.reset();
    this.modalRef.close();
  }

  open(content) {
    console.log('open modal', content);
    this.modalRef = this.modalService.open(content);
  }

}
