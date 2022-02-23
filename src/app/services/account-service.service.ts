import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Customer } from '../models/customer.model';
import { TermDepAccount } from '../models/termDepAccount.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private baseURL='http://localhost:8080/MoneyBank';
  constructor(private http: HttpClient) { }

  fetchSavingsAccount(user:Customer){
return this.http.post<any>(this.baseURL+'/getSbAccount/',user);
  }

  createSavingsAccount(user:Customer){
    return this.http.post<any>(this.baseURL+'/createSBAccount/',user);
      }

  createTermDepAccount(account:TermDepAccount){
    console.log(account)
    return this.http.post<any>(this.baseURL+'/createTermDepAccount',account);
  }
  fetchTermDepoAccounts(user:Customer){
    return this.http.post<any>(this.baseURL+'/getTermAccount',user);
      }

      fetchTransactions(user:Customer){
        return this.http.post<any>(this.baseURL+'/getTransactions',user);
          }
}
