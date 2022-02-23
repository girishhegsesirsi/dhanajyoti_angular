import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MoneyBank';
  currentUser: User;
  currentlogedUser: User;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentlogedUser=this.authenticationService.currentUserValue;

    var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    this.currentUser=user;
    console.log(this.currentUser); 
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  ngOnInit() {
  
  }
}
