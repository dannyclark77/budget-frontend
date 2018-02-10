import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { MessageService } from '../message.service';


@Injectable()
export class AuthService {

  constructor(
    private authApiService: AuthApiService,
    private messageService: MessageService
  ) { 
    this.authApiService.loggedIn$.subscribe(
      loggedIn => {
        if(loggedIn === true){
          this.messageService.addMessage('success','Successfully logged in!', 2000);
        }
        else if(loggedIn === 400) {
          this.messageService.addMessage('danger','Login failed. Check username and password.', 4000);
        }
        else if(loggedIn === 401) {
          this.messageService.addMessage('danger','Login failed. Access is denied due to invalid credentials.', 4000);
        } else {
          this.messageService.addMessage('danger','Login failed. Please try again.', 4000);
        }
      }
    )

    this.authApiService.signedUp$.subscribe(
      signedUp => {
        if (signedUp === true) {
          this.messageService.addMessage('success','Successfully signed up!', 2000);

        } else if(signedUp === 400) {
          this.messageService.addMessage('danger','Signup failed. Please check email and password.', 4000);

        } else if(signedUp === 401) {
          this.messageService.addMessage('danger','Signup failed. Access is denied due to invalid credentials.', 4000);
        } else {
          this.messageService.addMessage('danger','Signup failed. Please try again.', 4000);
        }
      }
    )

    this.authApiService.changedPassword$.subscribe(
      changedPassword => {
        if (changedPassword === true) {
          this.messageService.addMessage('success', 'Successfully changed password!', 2000);
        } else if(changedPassword === 400) {
          this.messageService.addMessage('danger', 'Change Password failed. Please check passwords.', 4000);
        } else if (changedPassword === 401) {
          this.messageService.addMessage('danger', 'Change Password failed. Access is denied due to invalid credentials.', 4000);
        } else {
          this.messageService.addMessage('danger', 'Change Password failed. Please try again.', 4000);
        }
      }
    )
  }

  signUp(username, password) {
    this.authApiService.signUp(username, password).subscribe(
      signedUp => {
        if (signedUp) {
          this.login(username, password);
          return true
        } else {
          return false
        }
      }
    )
  }

  login(username, password) {
    this.authApiService.login(username, password).subscribe(
      loggedIn => {
        if (loggedIn) {
          return true
        } else {
          return false
        }
      }
    )
  }

  changePassword(oldPassword, newPassword) {
    this.authApiService.changePassword(oldPassword, newPassword).subscribe(
      changedPassword => {
        if (changedPassword) {
          return true
        } else {
          return false
        }
      }
    )
  }

  logout() {
    if (localStorage.getItem('auth_token')) {
      localStorage.removeItem('auth_token');
      this.messageService.addMessage('success', 'Successfully signed out!', 2000);      
    } else {
      this.messageService.addMessage('danger', 'Must be signed in to log out', 4000);
    }
  }

}
