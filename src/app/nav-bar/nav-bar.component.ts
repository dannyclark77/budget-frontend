import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('signUpModal') signUpModal: SignUpComponent;
  @ViewChild('signInModal') signInModal: SignInComponent;
  @ViewChild('changePasswordModal') changePasswordModal: ChangePasswordComponent;

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  openSignUpModal() {
    this.signUpModal.open();
  }

  openSignInModal() {
    this.signInModal.open();
  }

  openChangePasswordModal() {
    this.changePasswordModal.open();
  }

}
