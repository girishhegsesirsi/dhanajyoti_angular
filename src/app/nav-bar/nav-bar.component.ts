import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {

isCust:boolean=true;
isActive:boolean=false;

  displayAccount:boolean=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authenticationService: AuthenticationService) {
    var userString =localStorage.getItem("loggedinUser");
  var user:Customer=JSON.parse(userString);
  if(user.role=="C"){
    this.isCust=true;
    console.log("isCust",this.isCust);
  }
  else this.isCust=false;
  if(user.user_status=="A")
{ this.isActive=true;}
else
  this.isActive=false;
  }

  toggleAccount(){
    console.log("indise the toggle displaymethod");
    this.displayAccount=!this.displayAccount;
  }

  ngOnInit()
{
  
}
 

  logout(){
    this.authenticationService.logout();
  }
}
