import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { User } from '../models/user';
import { TermDepAccount } from '../models/termDepAccount.model';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../models/customer.model';
@Component({
  selector: 'app-term-deposit-account',
  templateUrl: './term-deposit-account.component.html',
  styleUrls: ['./term-deposit-account.component.css']
})
export class TermDepositAccountComponent implements OnInit {
  hasTermAccount:boolean=false;
  doesnothasSavingAccount:boolean=true;
  termDepAccounts:TermDepAccount[];
  termDepAccount:TermDepAccount;
  showForm:boolean=false;
  TermAcctForm: FormGroup;
  constructor(private acctService:AccountServiceService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.TermAcctForm = this.formBuilder.group({
      termAount: ['', Validators.required],
      termTenure: ['', [Validators.required]]
    });
    this.fetchTermDepAccount();
  }

  get f() { 
    return this.TermAcctForm.controls; 
  }
showTermForm(){
  this.showForm=true;
}

hideForm(){
  this.showForm=false;
}
  createTermDepAccount(){
    var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    console.log("currentuser",user);
    this.termDepAccount = new TermDepAccount();
    this.termDepAccount.user=user;
    this.termDepAccount.deposit_tenure=this.TermAcctForm.controls.termTenure.value;
    this.termDepAccount.acct_banance=this.TermAcctForm.controls.termAount.value;
      this.acctService.createTermDepAccount(this.termDepAccount).pipe(first())
      .subscribe(
        response=>{
          if(response!=null){
            this.termDepAccount = response;
           // console.log(this.savingAccount);
            console.log(this.termDepAccount);
            this.hideForm();
            this.hasTermAccount=true;
          }else{
            console.log("user does not have term account");
          }

        },
        error=>{
          console.log( "Error while creating  account ", error);
        }
      );
    
    
  }
 
  fetchTermDepAccount(){
    console.log("inside fetchTermDepAccount()");
   var userString =localStorage.getItem("loggedinUser");
   var user:Customer=JSON.parse(userString);
   console.log("inside fetchTermDepAccount()");
this.acctService.fetchTermDepoAccounts(user)
.pipe(first()).subscribe(
response=>{
  if(response!=null){
    this.termDepAccounts =  response;
    console.log(this.termDepAccounts);
    this.hasTermAccount=true;
    
  }else{
    console.log("user does not have fetchTermDepAccount");
    this.hasTermAccount=false;
  }
},
error=>{
  console.log( "Error in while fetching account details ", error);
});
  }
}


