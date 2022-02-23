import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';
import { SavingAccount } from '../models/savingAccount.model';
import { Customer } from '../models/customer.model';
@Component({
  selector: 'app-saving-account',
  templateUrl: './saving-account.component.html',
  styleUrls: ['./saving-account.component.css']
})
export class SavingAccountComponent implements OnInit {
  hasSavingAccount:boolean=true;
  doesnothasSavingAccount:boolean=true;
  savingAccount:SavingAccount;
  constructor(private acctService:AccountServiceService) { }

  ngOnInit() {
    this.fetchSavingsAccount();
  }
 
  createSavingsAccount(){
    var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    if(!this.hasSavingAccount){
      this.acctService.createSavingsAccount(user).pipe(first())
      .subscribe(
        response=>{
          if(response!=null){
            this.savingAccount = response;
           // console.log(this.savingAccount);
            console.log(this.savingAccount.acct_id);
            this.hasSavingAccount=true;
            this.doesnothasSavingAccount=false;
          }else{
            console.log("user does not have SavingAccount");
          }

        },
        error=>{
          console.log( "Error in while creating  account ", error);
        }
      );
    }
    
  }
 
  fetchSavingsAccount(){
    console.log("inside fetchSavingsAccount()");
   var userString =localStorage.getItem("loggedinUser");
   var user:Customer=JSON.parse(userString);
   console.log("inside fetchSavingsAccount()");
this.acctService.fetchSavingsAccount(user)
.pipe(first()).subscribe(
response=>{
  if(response!=null){
    this.savingAccount =  response;
    console.log(this.savingAccount);
    this.hasSavingAccount=true;
    this.doesnothasSavingAccount=false;
  }else{
    console.log("user does not have SavingAccount");
    this.hasSavingAccount=false;
    this.doesnothasSavingAccount=true;
  }
},
error=>{
  console.log( "Error in while fetching account details ", error);
});
  }
}
