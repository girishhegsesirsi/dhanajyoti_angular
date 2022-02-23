import { Component, OnInit } from '@angular/core';
import { NewUser } from '../models/newUserData.model';
import { UserService } from '../services/userkyc.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
action:string="";
newUsers:NewUser[];
havenewUsers:boolean=false;
noNewusers:boolean=false;
showImage:boolean=false;
selectedUser=new NewUser();
doc:string;

// Pagination parameters.
p: Number = 1;
count: Number = 5;
  constructor(private userService:UserService) {
    
   }

  ngOnInit() {
    this.fetchNewUsers();
  }

  approve(i:number){
console.log(this.newUsers[i]);
 this.selectedUser =this.newUsers[i];
 this.selectedUser.action="A";
 this.approveOrReject(this.selectedUser,i);
 this.showImage=false;

  }
  showImages(i:number){
    this.showImage=true;
    this.selectedUser =this.newUsers[i];
    this.doc="data:image/png;base64,"+this.selectedUser.doc_list[0];
   
  }
  hideImage(){
    this.showImage=false;
  }

  reject(i:number){
    console.log(this.newUsers[i]);
    this.selectedUser =this.newUsers[i];
    this.selectedUser.action="R";
    this.approveOrReject(this.selectedUser,i);
    this.showImage=false;
  }
approveOrReject(selectedUser:NewUser,index:number)
{

  this.userService.approveOrReject(selectedUser)
   .pipe(first()).subscribe(
   response=>{
   if(response!=null){
     console.log(response);
     this.newUsers.splice(index,1);
     this.selectedUser=null;
     
   }else{
     console.log("user does not have fetchTermDepAccount");
   }
   },
   error=>{
   console.log( "Error in while fetching account details ", error);
   });

}

  fetchNewUsers(){
    console.log("fetchNewUsers()");
   this.userService.getAllNewUsers()
   .pipe(first()).subscribe(
   response=>{
   if(response!=null){
     this.newUsers =  response;
     this.havenewUsers=true;
     this.noNewusers=false;
     console.log(this.newUsers);
     
   }else{

    this.havenewUsers=false;
     this.noNewusers=true;
     console.log("user does not have fetchTermDepAccount");
   }
   },
   error=>{
   console.log( "Error in while fetching account details ", error);
   });
   }

}
