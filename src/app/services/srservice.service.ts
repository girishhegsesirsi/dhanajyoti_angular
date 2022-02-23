import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { ServiceRequest } from '../models/SR.model';

@Injectable({
  providedIn: 'root'
})
export class SRserviceService {

  private baseURL='http://localhost:8080/MoneyBank';
  constructor(private http: HttpClient) { }

  createSR(sr:ServiceRequest){
return this.http.post<any>(this.baseURL+'/createSR',sr);
  }
}
