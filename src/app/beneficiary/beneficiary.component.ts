import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../models/beneficiary.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BeneficiaryServiceService } from '../services/beneficiary-service.service';
import { Customer } from '../models/customer.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {

  hasben:boolean=false;
  doesnothasben:boolean=true;
  beneficiaries:Beneficiary[];
  beneficiary:Beneficiary;
  showForm:boolean=false;
  benForm: FormGroup;
  returnMsg:string="";
  constructor(private benService:BeneficiaryServiceService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.benForm = this.formBuilder.group({
      benType: ['', Validators.required],
      benNickName: ['', Validators.required],
      benAccount: ['', Validators.required],
      ifsc: ['', [Validators.required]]
    });
    this.fetchBeneficiaries();
  }
showTermForm(){
  this.showForm=true;
}

hideForm(){
  this.showForm=false;
}

addBeneficiary(){
  this.returnMsg="";
  var userString =localStorage.getItem("loggedinUser");
  var user:Customer=JSON.parse(userString);
  console.log("currentuser",user);
  this.beneficiary = new Beneficiary();
  this.beneficiary.user=user;
  this.beneficiary.ben_account_num=this.benForm.controls.benAccount.value;
  this.beneficiary.ben_type=this.benForm.controls.benType.value;
  this.beneficiary.ben_nick_name=this.benForm.controls.benNickName.value;
  this.beneficiary.ben_bank_ifsc=this.benForm.controls.ifsc.value;
    this.benService.addBeneficiary(this.beneficiary).pipe(first())
    .subscribe(
      response=>{
        console.log(response);
        var bene=response;
        this.beneficiaries.push(bene);
        if(response!=null){
           this.returnMsg ="Beneficiary added successfully";
         // console.log(this.savingAccount);
          console.log(this.returnMsg);
          this.hideForm();
          this.hasben=true;
         this.doesnothasben=false;
        }else{
          console.log("could not add beneficiary");
          this.returnMsg="could not add beneficiary";
        }

      },
      error=>{

      
        console.log( "Error while creating  account ", error);
        this.returnMsg="could not add beneficiary";
      }
    );
  
  
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
  this.hasben=true;
  this.doesnothasben=false;
  
}else{
  console.log("user does not have fetchTermDepAccount");
  this.hasben=false;
  this.doesnothasben=true;
}
},
error=>{
console.log( "Error in while fetching account details ", error);
});
}
get f() { 
  return this.benForm.controls; 
}

}
