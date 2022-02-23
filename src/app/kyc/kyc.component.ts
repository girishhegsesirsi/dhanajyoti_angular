
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import {take, first } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { UserService } from '../services/userkyc.service';
import { KYC } from '../models/kyc.model';
import { KycServiceService } from '../services/kyc-service.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

  KycForm: FormGroup;
kyc:KYC=new KYC();
  isSubmitted : boolean;
  //categories: Category[];

fileData: File = null;
previewUrl:any = null;
fileUploadProgress: string = null;
uploadedFilePath: string = null;
currentFileUpload: File;
registringUser:Customer= new Customer();
selectedFiles: FileList;  
imageError:string="";
base64textString:string;
showForm:boolean=true;
returnMsg="";
  id;
  
  constructor(private formBuilder: FormBuilder, private kycService:KycServiceService) { }
  ngOnInit() {
  
    this.KycForm= this.formBuilder.group({
 
      docType: ['', Validators.required],
        document: ['', Validators.required]
    });
}
get f() { 
  return this.KycForm.controls; 
}

fileProgress(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.preview();
}

preview() {
// Show preview 
var mimeType = this.fileData.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}

var reader = new FileReader();      
reader.readAsDataURL(this.fileData); 
reader.onload = (_event) => { 
  this.previewUrl = reader.result; 
}
}

onSubmit() {
  this.isSubmitted = true;
  var userString =localStorage.getItem("loggedinUser");
    var user:Customer=JSON.parse(userString);
    this.kyc.kyc_type=this.KycForm.controls.docType.value;
    this.kyc.user=user;
    this.kyc.document_desc="";
    if(this.currentFileUpload!=null)
    this.kyc.document_file=this.base64textString;
    this.kycService.saveFile(this.kyc).pipe(first()).subscribe(
      response=> {
        this.returnMsg=response.result;
      this.showForm=false;
        console.log("file uploaded successfully");
      },
      error=>{
        this.showForm=true;
        console.log("error occured",error);
      }
    );
    

}

onReset() {
  this.isSubmitted = false;
  this.KycForm.reset();
}
selectFile(event){

  this.imageError = null;
        if (event.target.files && event.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg','image/jpg','application/pdf'];
            const max_height = 15200;
            const max_width = 25600;
            this.currentFileUpload =event.target.files[0];
            if (this.currentFileUpload.size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';
 
                return false;
            }
          const type=this.currentFileUpload.type;
          console.log(allowed_types.indexOf(type));
            if (allowed_types.indexOf(type)==-1) {
              console.log("image format is not allowed");
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }

            var reader = new FileReader();
            reader.onload =this.handleFile.bind(this);

            reader.readAsBinaryString(this.currentFileUpload);
}
}

handleFile(event) {
  var binaryString = event.target.result;
         this.base64textString= btoa(binaryString);
         console.log("base 64 file ",btoa(binaryString));
 }
/*selectFile(event) {  
  const file = event.target.files.item(0);  
 
  if (file.type.match('image.*')) {  
    var size = event.target.files[0].size;  
    if(size > 1000000)  
    {  
        alert("size must not exceeds 1 MB");  
        this.KycForm.get('document').setValue("");  
    }  
    else  
    {  
      this.selectedFiles = event.target.files;  
    }  
  } else {  
    alert('invalid format!');  
  }  

}    */ 

}
