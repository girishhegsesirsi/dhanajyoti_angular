import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../models/customer.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



/*The home component gets the current user from the authentication service by subscribing to the currentUser observable in the authentication service. The subscription for the current user is stored in a variable so it can be unsubscribed from when the home component is destroyed, this is to prevent memory leaks from orphaned subscriptions in the Angular 7 app.

The home component gets all users from the user service and makes them available to the home template via the users property.*/

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: Customer;
    currentUserSubscription: Subscription;
    isActive:boolean=false;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            console.log(this.currentUser);
  
        });
    }

    ngOnInit() {
        if(this.currentUser.user_status=='A')
        this.isActive=true;
        else this.isActive=false;
  
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

}
