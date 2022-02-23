import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, EMPTY, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { map, filter, catchError } from 'rxjs/operators';
import { NewUser } from '../models/newUserData.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//private baseURL='http://localhost:8080/MoneyBank/users';
private baseURL='http://localhost:8080/MoneyBank';

  constructor(private http:HttpClient ) {}

  saveCustomer(cust:Customer):Observable<Object>{
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(cust, null, 4));
    console.log("inside cust service saveCustomer() : " ,cust);
    return this.http.post(this.baseURL+'/saveCustomer',cust);
    //return this.http.get(this.baseURL+'/welcome');
  }

  testConnectivity():void{
    console.log("inside cust service testConnectivity()");
     this.http.get(this.baseURL+'/welcome');
  }

  /*getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseURL+'/saveCustomer').pipe(map((resp:Response)=>resp.json()),
    
    catchError( err => {
      if (err.status == 401) {
       console.log("401 error");
          return EMPTY;
      } else {
          return throwError(err);
      }
 }
    ));
     }
    */
   getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseURL+'/getCustomers');
  }

  getAllNewUsers():Observable<NewUser[]>{
    return this.http.get<NewUser[]>(this.baseURL+'/getNewUsers');
  }
 
  approveOrReject(selectedUser:NewUser){
    return this.http.post(this.baseURL+'/approveOrReject',selectedUser);
  }
 


}
