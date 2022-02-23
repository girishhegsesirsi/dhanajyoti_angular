

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


/*The login component uses the authentication service to login to the application. If the user is already logged in they are automatically redirected to the home page.

The loginForm: FormGroup object defines the form controls and validators, and is used to access data entered into the form. The FormGroup is part of the Angular Reactive Forms module and is bound to the login template above with the [formGroup]="loginForm" directive.*/

export class LoginComponent implements OnInit {
  users:User[];
  loading = false;
  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  returnMsg:string;
  currentUser:User;
  isAuthFailed:boolean=false;
  authFailed : string;
  
  constructor(private formBuilder: FormBuilder,
     private router: Router,private route: ActivatedRoute,private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.returnMsg = this.route.snapshot.queryParams['returnMsg'] || '';
  }
 

  onSubmit() {
    this.submitted = true;
this.returnMsg="";
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.currentUser=this.loginForm.value;
    var encryptedPassword:string = btoa (this.currentUser.password);
    console.log("encrypted password ",encryptedPassword);
    this.currentUser.password = encryptedPassword;
    this.authenticationService.login(this.currentUser)
        .pipe(first())
        .subscribe(
          response => {  
           let  result : User =  response;  
            if(result !=null)  
            {  
              let currentUser=result.username;
              let role=result.role;
              if (currentUser){
              if(role=="C"){
                this.router.navigate(['/custHome']); 
              }  else  if(role=="M"){
                this.router.navigate(['/manage']); 
              } 
              
            }
              
            }  
            if(result == null)  
            {  
             // alert("please register before login Or Invalid combination of Email and password");
              this.authFailed="Either invalid combination of Email and password or the user not registered";
              this.isAuthFailed=true;  
               this.loading = false;
            }  
          }
        ,
            error => {
              console.log( "Error in authentication ", error);
                this.loading = false;
            });
}

    // convenience getter for easy access to form fields
    get f() { 
      return this.loginForm.controls; 
    }

}
