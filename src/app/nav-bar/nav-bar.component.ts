import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthService } from '../auth/auth.service';

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
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { 
    authService.isAuthenticated$.subscribe(
      auth => {
        this.isAuthenticated = auth
        console.log('auth is ', this.isAuthenticated);
      });
  }

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

  logout() {
    this.authService.logout();
  }

}
