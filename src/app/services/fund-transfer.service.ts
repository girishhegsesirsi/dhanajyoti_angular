import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { FundTransfer } from '../models/fundTransfer.model';

@Injectable({
  providedIn: 'root'
})
export class FundTransferService {
  private baseURL='http://localhost:8080/MoneyBank';
  constructor(private http: HttpClient) { }

  transferFunds(transfer:FundTransfer){
    return this.http.post<any>(this.baseURL+'/fundTransfer',transfer);
      }
    
}
