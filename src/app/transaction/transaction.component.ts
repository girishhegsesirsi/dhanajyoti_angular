import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { AccountServiceService } from '../services/account-service.service';
import { first } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions:Transaction[];
  haveTransaction:boolean=false;
  doesnothaveTransaction:boolean=false;

  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  constructor(private acctService:AccountServiceService) { }

  ngOnInit() {
    this.fetchTransactions();
  }

  
  fetchTransactions(){
    console.log("inside fetchTransactions()");
   var userString =localStorage.getItem("loggedinUser");
   var user:Customer=JSON.parse(userString);
this.acctService.fetchTransactions(user)
.pipe(first()).subscribe(
response=>{
  if(response!=null){
    this.transactions =  response;
    console.log(this.transactions);
    this.haveTransaction=true;
    
  }else{
    console.log("user does not have fetchTermDepAccount");
    this.doesnothaveTransaction=false;
  }
},
error=>{
  console.log( "Error in while fetching account details ", error);
});
  }

}
