import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { UserService } from '../services/userkyc.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-manage-cust',
  templateUrl: './manage-cust.component.html',
  styleUrls: ['./manage-cust.component.css']
})
export class ManageCustComponent implements OnInit {
  customers$:Observable<Customer[]>;
  customers:Customer[];

  constructor(private custService:UserService) { }

  ngOnInit() {
  }

  getAllCustomers(){
    this.custService.getAllCustomers()
    .subscribe((custData)=>{
      this.customers = custData,
      console.log(custData)
    },(error)=>
    {console.log(error)}
  
  
    );
  }

}
