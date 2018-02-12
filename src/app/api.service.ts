import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



const api_url = environment.apiUrl;

@Injectable()
export class ApiService {

  private budgetEntries = new Subject();
  budgetEntries$ = this.budgetEntries.asObservable();

  constructor(
    private http: Http
  ) { }

  createPurchase(data) {
    return this.http
      .post(api_url + '/purchases', data)
      .map(response => {
        return response.json()
      })
      .catch(this.handleError)
  }

  handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  createCategory(category) {
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('user_id');
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers });
    const data = {category: {'name': category.name, 'amount': category.amount, 'user_id': user_id }}

    const createdCategory = this.http
      .post(api_url + 'categories', data, options)
      .catch(this.handleError);

    createdCategory.subscribe(
      res => {
        console.log('res is ', res)
      }
    )
  }

  getBudgetCategories() {
    const params = {user_id: localStorage.getItem('user_id')}
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers, params: params });

    const gotCategories = this.http
      .get(api_url + 'categories', options)
      .catch(this.handleError);

    gotCategories.subscribe(
      res => {
        res = res.json();
        this.budgetEntries.next(res);
      }
    )
  }

  deleteCategory(categoryId) {
    console.log('category id in api service is ', categoryId);
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    headers.append('Authorization', `Token ${token}`);
    let options = new RequestOptions({ headers: headers });

    const removeCategory = this.http
      .delete(api_url + 'categories/' + categoryId, options)
      .catch(this.handleError);

    removeCategory.subscribe(
      res => {
        res = res.json();
      }
    )
  }

}
