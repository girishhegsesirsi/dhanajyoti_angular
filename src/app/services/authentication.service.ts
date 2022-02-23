import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';


/*The authentication service is used to login and logout of the application, to login it posts the users credentials to the api and checks the response for a JWT token, if there is one it means authentication was successful so the user details including the token are added to local storage.

The logged in user details are stored in local storage so the user will stay logged in if they refresh the browser and also between browser sessions until they logout. If you don't want the user to stay logged in between refreshes or sessions the behaviour could easily be changed by storing user details somewhere less persistent such as session storage which would persist between refreshes but not browser sessions, or in a private variable in the authentication service which would be cleared when the browser is refreshed.

There are two properties exposed by the authentication service for accessing the currently logged in user. The currentUser observable can be used when you want a component to reactively update when a user logs in or out, for example in the app.component.ts so it can show/hide the main nav bar when the user logs in/out. The currentUserValue property can be used when you just want to get the current value of the logged in user but don't need to reactively update when it changes, for example in the auth.guard.ts which restricts access to routes by checking if the user is currently logged in.*/



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<Customer>;
    public currentUser: Observable<Customer>;
     private baseURL='http://localhost:8080/MoneyBank';

    constructor(private http: HttpClient,private router: Router) {
        //localStorage.clear;
        this.currentUserSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('loggedinUser')));
        this.currentUser = this.currentUserSubject.asObservable();     
    }

    public get currentUserValue(): Customer {
        return this.currentUserSubject.value;
    }

    login(user:User) {
        console.log("inside login() of AuthenticationService, incoming data:",user);
       // return this.http.post<any>(this.baseURL+'/authLogin', user,{'headers' : new HttpHeaders ({'Content-Type' : 'application/json'}),  observe:'response'});
       return this.http.post<any>(this.baseURL+'/authLogin', user) .pipe(map(customer => {
       
        if (customer) {
            
            localStorage.setItem('loggedinUser', JSON.stringify(customer));
           // this.currentUser.subscribe(x=>console.log("currentUser: ",x));
            
            this.currentUserSubject.next(customer);
   
            this.currentUser.subscribe(x=>console.log("currentUser: ",x));
        }

        return customer;
    }));
    }

      isLoggedIn() {   

    // get the token from the localStorage as we have to work on this token.  
    let token = localStorage.getItem('loggedinUser');  
  
    // check whether if token have something or it is null.  
    if(!token)  
    {  
      return false;  
    } return true;
}

    logout() {
        // remove user from local storage to log user out
       localStorage.removeItem('loggedinUser');
       this.currentUserSubject.next(null);
        this.router.navigate(["/login"],{ queryParams: { returnMsg: "User loged out successfully" }});
    }

    register(user: Customer) {
        console.log("User data in user service : "+user);
        return this.http.post<any>(this.baseURL+`/registerUser`, user);
    }
}