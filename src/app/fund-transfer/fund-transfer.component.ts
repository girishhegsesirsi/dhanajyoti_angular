import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../models/beneficiary.model';
import { FundTransferService } from '../services/fund-transfer.service';
import { Customer } from '../models/customer.model';
import { BeneficiaryServiceService } from '../services/beneficiary-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FundTransfer } from '../models/fundTransfer.model';
import { SavingAccount } from '../models/savingAccount.model';
import { AccountServiceService } from '../services/account-service.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  beneficiaries:Beneficiary[];
  fundForm: FormGroup;
  fundTransfer:FundTransfer=new FundTransfer();
  fromAccount:SavingAccount;
  hasSavingAccount:boolean=false;
  doesnothasSavingAccount:boolean=false;
  showForm:boolean=false;
  returnMsg:string="";

  constructor(private fundTransferService:FundTransferService,
    private benService:BeneficiaryServiceService,private acctSerivice:AccountServiceService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.fundForm = this.formBuilder.group({
      ben: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.fetchBeneficiaries();
  
    this.fetchSavingsAccount();

  }
 
  
  fetchSavingsAccount(){
    console.log("inside fetchSavingsAccount()");
   var userString =localStorage.getItem("loggedinUser");
   var user:Customer=JSON.parse(userString);
   console.log("inside fetchSavingsAccount()");
this.acctSerivice.fetchSavingsAccount(user)
.pipe(first()).subscribe(
response=>{
  if(response!=null){
    this.fromAccount =  response;
    this.hasSavingAccount=true;
    this.doesnothasSavingAccount=false;
    this.showForm=true;
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


  fetchBeneficiaries(){
    var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    console.log("inside fetchBeneficiaries()");
   this.benService.fetchBeneficiaries(user)
   .pipe(first()).subscribe(
   response=>{
   if(response!=null){
     this.beneficiaries =  response;
     console.log(this.beneficiaries);
     
   }else{
     console.log("user does not have fetchTermDepAccount");
   }
   },
   error=>{
   console.log( "Error in while fetching account details ", error);
   });
   }

   
transferFund(){
  this.returnMsg="";
var selectedBen:Beneficiary=(this.fundForm.controls.ben.value);
this.fundTransfer.ben=selectedBen;
this.fundTransfer.amount=this.fundForm.controls.amount.value;
this.fundTransfer.fromAccount=this.fromAccount;
this.fundTransferService.transferFunds(this.fundTransfer).pipe(first()).subscribe(
  response=>{
    if(response!=null){
      console.log("response ",response);
      this.returnMsg=response.result;
      this.showForm=false;
      this.fromAccount.acct_banance=(this.fromAccount.acct_banance-this.fundForm.controls.amount.value);
    }
  },
  error=>{
    console.log("error occured ",error);
    this.showForm=false;
  }
);


}
}
