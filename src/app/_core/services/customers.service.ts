import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Customer } from '../interfaces/customer';

type CustomersResponse = Customer[];

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  get customers(): Customer[] {
    return this._customers;
  }

  set customers(newCustomers: Customer[]) {
    this._customers = newCustomers;
    this.customersChanged.next(this.customers);
  }

  public customersChanged = new BehaviorSubject<Customer[]>(this.customers);
  private _customers: Customer[];

  constructor(private apiService: ApiService) {
  }

  public getCustomers(): Observable<CustomersResponse> {
    const req = this.apiService.get<CustomersResponse>('customers');

    req.subscribe(
      (customers) => {
        this.customers = customers;
      },
      (err) => {
        console.error(err);
      }
    );

    return req;
  }

}
