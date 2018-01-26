import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

const api_url = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  createPurchase(data) {
    return this.http
      .post(api_url + '/purchase', data)
      .map(response => {
        return response.json()
      })
      .catch(this.handleError)
  }

  handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
