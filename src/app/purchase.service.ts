import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class PurchaseService {

  constructor(
    private http: Http
  ) { }

}
