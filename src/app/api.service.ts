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

  private purchases = new Subject();
  purchases$ = this.purchases.asObservable();

  constructor(
    private http: Http
  ) { }

  createPurchase(purchase) {
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('user_id');
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers });
    const data = {purchase: {'total': purchase.total, 'date': purchase.date, 'name': purchase.name, 'user_id': user_id, 'category_id': purchase.category}}

    const createdPurchase = this.http
      .post(api_url + 'purchases', data, options)
      .catch(this.handleError);

    createdPurchase.subscribe(
      res => {
        this.getPurchases('2000-01-01', '2020-01-01');
      }
    )
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
        this.getBudgetCategories();
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
        this.getBudgetCategories();
      }
    )
  }

  updateCategory(info, id) {
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('user_id');
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers });
    const data = {category: {'name': info.name, 'amount': info.amount, 'user_id': user_id}}

    const updatedCategory = this.http
      .patch(api_url + 'categories/' + id, data, options)
      .catch(this.handleError);

    updatedCategory.subscribe(
      res => {
        res = res.json();
        this.getBudgetCategories();
      }
    )
  }

  getPurchases(startdate, enddate) {
    const params = {user_id: localStorage.getItem('user_id'), startdate: startdate, enddate: enddate};
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers, params: params });

    const gotPurchases = this.http
      .get(api_url + 'purchases', options)
      .catch(this.handleError);

    gotPurchases.subscribe(
      res => {
        res = res.json();
        console.log('res is ', res);
        this.purchases.next(res);
      }
    )
  }

  deletePurchase(purchaseId) {
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    headers.append('Authorization', `Token ${token}`);
    let options = new RequestOptions({ headers: headers });

    const removePurchase = this.http
      .delete(api_url + 'purchases/' + purchaseId, options)
      .catch(this.handleError);

    removePurchase.subscribe(
      res => {
        res.json();
        this.getPurchases('2000-01-01', '2020-01-01');
      }
    )
  }

  updatePurchase(info, id) {
    const headers = new Headers();
    const token = localStorage.getItem('auth_token');
    const user_id = localStorage.getItem('user_id');
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Token ${token}`);
    let options = new RequestOptions({ headers: headers });
    const data = {purchase: {'total': info.total, 'date': info.date, 'name': info.name, 'user_id': user_id, 'category_id': info.category}}

    const updatedPurchase = this.http
      .patch(api_url + 'purchases/' + id, data, options)
      .catch(this.handleError)

    updatedPurchase.subscribe(
      res => {
        res.json()
        this.getPurchases('2000-01-01', '2020-01-01');
      }
    )
  }

}