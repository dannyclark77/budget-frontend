import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('modal') modal: SignUpComponent;

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.modal.open();
  }

}
