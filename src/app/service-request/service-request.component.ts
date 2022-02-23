import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { SRserviceService } from '../services/srservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceRequest } from '../models/SR.model';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  hasOpenSR:boolean=false;
  srForm:FormGroup;
  srRequest:ServiceRequest=new ServiceRequest();
returnMsg:string="";
  constructor(private SRservice:SRserviceService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.srForm = this.formBuilder.group({
      srType: ['', Validators.required] })
  }
  get f() { 
    return this.srForm.controls; 
  }
  createSR(){
    var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    this.srRequest.user=user;
    this.srRequest.req_desc=this.srForm.controls.srType.value;
    this.SRservice.createSR(this.srRequest).subscribe(
      response=> {
console.log(response);
this.returnMsg=response.result;
this.hasOpenSR=true;
      },
      error=>{
        console.log("error occured", error);
      }
      
    );

  }

}
