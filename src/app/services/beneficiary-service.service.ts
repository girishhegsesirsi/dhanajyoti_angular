import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beneficiary } from '../models/beneficiary.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryServiceService {

  private baseURL='http://localhost:8080/MoneyBank';
  constructor(private http: HttpClient) { }

  fetchBeneficiaries(user:Customer){
    return this.http.post<any>(this.baseURL+'/getBeneficiaries',user);
      }
    
      addBeneficiary(ben:Beneficiary){
        return this.http.post<any>(this.baseURL+'/addBeneficiary',ben);
          }
    
}
