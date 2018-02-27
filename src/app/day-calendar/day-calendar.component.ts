import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.css']
})
export class DayCalendarComponent implements OnInit {

  date: NgbDateStruct;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  dateDisplay() {
    if (typeof this.date === 'object') {
      this.budgetService.newDate(this.date);
    }
  }

}
