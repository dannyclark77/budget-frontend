import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';


@Injectable()
export class AuthService {

  constructor(
    private authApiService: AuthApiService
  ) { 
    this.authApiService.loggedIn$.subscribe(
      loggedIn => {
        if (loggedIn === true) {
          console.log('logged in auth service is', loggedIn);
        } else {
          console.log('loggedIn not true', loggedIn);
        }
      }
    )

    this.authApiService.signedUp$.subscribe(
      signedUp => {
        if (signedUp === true) {
          console.log('signed up in auth service is', signedUp);
        } else {
          console.log('signed Up not true', signedUp);
        }
      }
    )

    this.authApiService.changedPassword$.subscribe(
      changedPassword => {
        if (changedPassword === true) {
          console.log('changed password ', changedPassword);
        } else {
          console.log('did not change password ', changedPassword);
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
    localStorage.removeItem('auth_token');
    console.log('auth_token is ', localStorage.getItem('auth_token'));
  }

}
