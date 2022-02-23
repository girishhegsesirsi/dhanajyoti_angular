



import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import {take, first } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { UserService } from '../services/userkyc.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmPasswordValidator } from '../customValidator/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
returnMsg:string="";
encryptSecretKey:string="prajnanaBrahmam";
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
      
  ) { 
      // redirect to home if already logged in
     /* if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }*/
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', [Validators.required,Validators.maxLength(100)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          role: ['', Validators.required],
          dob :['', Validators.required],
          address :  this.formBuilder.group({
          adrl1:['', [Validators.required,Validators.maxLength(200)]],
          adrl2 :['', [Validators.required,Validators.maxLength(200)]],
          city :['', [Validators.required,Validators.maxLength(50)]],
          state :['', [Validators.required, Validators.maxLength(50)]],
          pin :['', [Validators.required, Validators.min(100000),Validators.max(999999)]]                                }),
          mobile :['', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
          email :['', [Validators.required,Validators.email]],
          adhaar :['', [Validators.min(1000000000000000),Validators.max(9999999999999999)]],
          pan :['', [Validators.maxLength(10),Validators.minLength(10)]]
      },
      
      { validator: ConfirmPasswordValidator.MatchPassword });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }



  onSubmit() {
      this.submitted = true;
    //  console.log(this.registerForm.value);
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
     // console.log(this.registerForm.value);
      var encryptedPassword:string = btoa (this.registerForm.controls.password.value);
    //  console.log("encryptedPassword: ",encryptedPassword)
      var user:Customer=this.registerForm.value;
      user.password=encryptedPassword;

     // console.log("submitted user details: ",user)
      this.authenticationService.register(user)
          .pipe(first())
          .subscribe(
              data => {
                if(data.result=="success"){
                  this.returnMsg="Registration was sucessful";
                  console.log("Registration was sucessful");
                    this.router.navigate(['/login']);
                }
                else{
                  this.returnMsg=data.result;
                }
              },
              error => {
                console.log("error occured: ", error);
                  this.loading = false;
              });
  }
}