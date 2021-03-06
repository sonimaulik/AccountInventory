import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WebServicesService } from './../../services/web-services.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorBank,VendorBankTitles } from "../bank.model";
import { Vendor} from '../vendor.model';
import { SharedService } from './../../shared/shared.service';

@Component({
  selector: 'app-vendor-full-profile',
  templateUrl: './vendor-full-profile.component.html',
  styleUrls: ['./vendor-full-profile.component.css']
})
export class VendorFullProfileComponent implements OnInit {

  vendorsprofiledata;
  vendorsbankdata;
  isEditable=true;
  isEditableBank=false;
  vendorProfile:FormGroup;
  vendorBank:FormGroup;
  editBank:FormGroup;
  titles=VendorBankTitles;
  
  

  constructor(
    private showprofile:  WebServicesService,
     private route: ActivatedRoute,
     private _router:Router,
     private _shared:SharedService,
     private _fb:FormBuilder,
  ) {
    this.createVendorForm();
    this.createBankForms();
    this.createedit();
   }

  
  ngOnInit() {
     this.route.paramMap
      .switchMap((params: ParamMap) => this.showprofile.editvendor(+params.get('id')))
      .subscribe(response=> {this.vendorsprofiledata=response.response;
         this.vendorProfile.patchValue(this.vendorsprofiledata);
         this.showbank(this.vendorsprofiledata.id);
      // console.log(response)
    });

  }

  showbank(ids){
  let requesttype={onload:"onload",id:ids};
 this.showprofile.showvendorbank(JSON.stringify(requesttype))
  .subscribe(response=>{
    this.vendorsbankdata=response.response.bankdetails;
    // console.log(response);
  });
}

createVendorForm(){
    this.vendorProfile=this._fb.group(new Vendor(null,'','','','','','','','','',null,null,'','','',
  '','','','',null,null,'','','',
  ));
    this.Disable();
  }

  createedit(){
    this.editBank=this._fb.group(new VendorBank(null,'','','','',''));
  }

  onedit(data){
    this.editBank.patchValue(data);
    this.isEditableBank=true;
    // console.log(data);
  }

  createBankForms(){
    this.vendorBank=this._fb.group({
      banks: this._fb.array([]),
    });
  }

   get banks() {
    return this.vendorBank.get('banks') as FormArray;
  };

  addBank(){
    this.banks.push(this._fb.group(new VendorBank(this.vendorsprofiledata.id,'','','','','')));
  }

  onProfileEdit(){
     this.isEditable=false;
     this.vendorProfile.enable();
  }

  ondeletebank(data){
    this.showprofile.deletevendorbank(data.id)
    .subscribe(response=>{
      this._shared.notify('Bank '+response,'success');
      this.ngOnInit();
    })
  }


  removeBank(i: number) {
    this.banks.removeAt(i);
  }

  Disable(){
    this.isEditable=true;
    this.vendorProfile.disable();
  }

  profilesave(){
    // console.log(this.vendorProfile.value)
    this.showprofile.updatevendor(JSON.stringify(this.vendorProfile.value))
    .subscribe(response=>{
      this._shared.notify('Vendor Details '+response,'success');
    this.Disable();})  
  }

  onEditSubmit(){
    // console.log(this.editBank.value);
    this.showprofile.updatevendorbank(JSON.stringify(this.editBank.value))
    .subscribe(response=>{
      this._shared.notify('Bank Details '+response,'success');
      this.editBank.reset();
      this.ngOnInit();
      this.isEditableBank=false;
    })
  }

  onBankSubmit(){
    this.showprofile.newvendorbank(JSON.stringify(this.vendorBank.value))
    .subscribe(response=>{ this.createBankForms();
    this.showbank(this.vendorsprofiledata.id);})
  }

}
