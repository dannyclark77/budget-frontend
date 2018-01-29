import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


const api_url = environment.apiUrl;

@Injectable()
export class AuthApiService {

  token;

  private signedUpSource = new Subject();
  signedUp$ = this.signedUpSource.asObservable();

  private loggedInSource = new Subject();
  loggedIn$ = this.loggedInSource.asObservable();


  constructor(
    private http: Http
  ) { }

  signUp (email, password):Observable<boolean> {
    console.log('api service sign up ran');
    const data = {'credentials': {'email': email, 'password': password, 'password_confirmation': password }};
    return this.http
      .post(api_url + 'sign-up', data)
      .map(
        (res: any) => {
          console.log(res);
          if (res.ok) {
            res = res.json();
            this.token = res.token;
            localStorage.setItem('auth_token', res.token);
            this.signedUpSource.next(true);
            return true
          } else {
            return false;
          }
        }
      )
      .catch((error:any, caught) => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        let errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        errMsg = error.message ? error.message : error.toString();
        this.signedUpSource.next(error.status);
        return Observable.throw(errMsg);
      })
  }

  login(email, password): Observable<boolean> {
    console.log('api service log in ran');
    const data = {'credentials': {'email': email, 'password': password }};
    return this.http
      .post(api_url + 'sign-in', data)
      .map(
        (res: any) => {
          console.log(res);
          if (res.ok) {
            res = res.json();
            this.token = res.token;
            localStorage.setItem('auth_token', res.token);
            console.log('map', this);
            this.loggedInSource.next(true);
            return true
          } else {
            return false;
          }
        }
      )
      .catch((error: any, caught) => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        let errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        errMsg = error.message ? error.message: error.toString();
        console.log(error.status);

        this.loggedInSource.next(error.status);
        return Observable.throw(errMsg);
      })
  }

}
