import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';


@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { 
    this.apiService.loggedIn$.subscribe(
      loggedIn => {
        if (loggedIn === true) {
          console.log('logged in auth service is', loggedIn);
        } else {
          console.log('loggedIn not true', loggedIn);
        }
      }
    )

    this.apiService.signedUp$.subscribe(
      signedUp => {
        if (signedUp === true) {
          console.log('signed up in auth service is', signedUp);
        } else {
          console.log('signed Up not true', signedUp);
        }
      }
    )
  }

  signUp(username, password) {
    this.apiService.signUp(username, password).subscribe(
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
    this.apiService.login(username, password).subscribe(
      loggedIn => {
        if (loggedIn) {
          return true
        } else {
          return false
        }
      }
    )
  }

}
