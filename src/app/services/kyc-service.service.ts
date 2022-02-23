import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KYC } from '../models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycServiceService {

  private baseURL='http://localhost:8080/MoneyBank';
  constructor(private http: HttpClient) { }

 
  saveFile(kyc:KYC){
    console.log("inside the saveFile()",kyc);
    return this.http.post<any>(this.baseURL+'/fileUpload',kyc)
  }
}
