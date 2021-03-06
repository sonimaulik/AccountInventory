import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { Memo } from '../memo';
// import { DatepickerModule } from 'angular2-material-datepicker';
import { WebServicesService } from './../../services/web-services.service';
import { ConstantServiceService } from './../../services/constant-services.service';
import { newMemo } from '../memo.interface';
// import { SelectModule } from 'ng2-select';
// import { MemoOut } from './memoout';
import { MdDatepickerModule} from '@angular/material';
import { MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemoInvoiceComponent } from '../memo-invoice/memo-invoice.component';

@Component({
  selector: 'app-memoout',
  templateUrl: './memoout.component.html',
  styleUrls: ['./memoout.component.css'],
  providers : [ WebServicesService,ConstantServiceService ]
})
export class MemooutComponent implements OnInit {

  public myForm: FormGroup;
  loadInvoiceComponent:boolean = false;
  constructor(
    private _webservice : WebServicesService,
    public ConstantService : ConstantServiceService,
    private _fb: FormBuilder
  ) { }


  public handleEvent(childData:any){
		this.loadInvoiceComponent = false;
	}
  public names:Array<string> = this.ConstantService.NAMES;
  public brokers:Array<string> = this.ConstantService.BROKERS;
  public invoice:any = this.ConstantService.INVOICE;

  public  newmemo = new Memo(this.invoice);

  public memotype:any = "memoissue";

  private value:any = {}; 
  private _disabledV:string = '0';
  private disabled:boolean = false;
  finalMemoData : any;
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any,id):void {

    console.log('Selected value is: ', value, value.text);
    this.myForm.controls[id].patchValue(JSON.parse(JSON.stringify(value)).text);
    console.log(this.myForm);
  }
 
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }
  
  public dateConversion(date){
    console.log(date);
    var dd = new Date(date).getDate();
    var mm = new Date(date).getMonth() + 1;
    var yyyy = new Date(date).getFullYear();
    var dateString = yyyy + "/" + mm + "/" + dd;
    return dateString;
  }

  submitted = false;
  newmemodata : any;

  onSubmit() {
    this.submitted = true;
    console.log(this.newmemo);
    this.newmemodata = JSON.parse(JSON.stringify(this.newmemo));
    this.newmemodata.account_name = JSON.stringify(this.newmemodata.account_name);
    this.newmemodata.broker = JSON.stringify(this.newmemodata.broker);
    this.newmemodata.date = this.dateConversion(this.newmemodata.date);
    console.log(this.newmemodata);
    // this._webservice.postmemo(this.newmemodata,this.memotype);
  }

  ngOnInit() {
    
    this._webservice.generateInvoice('memo_issue').subscribe(response=>
      this.myForm.controls['invoice_number'].patchValue("MM-"+response)
    );

    this.myForm = this._fb.group({
      invoice_number: [''],
      no_of_days:[''],
      due_date:[''],
      date:[''],
      account_name:[''],
      broker:[''],
      reference:[''],
      memoDetails: this._fb.array([])
    });
    this.memoAdd();
  }

  initMemoDtails() {
    return this._fb.group({
      Stock_ID: [''],
      Lot_Number:[''],
      carats: [0],
      rate:[0],
      country:['']
    });
  }

  public calcDay():void{    
    this.myForm.controls['date'].patchValue(this.dateConversion(this.newmemo.date));
    if(this.newmemo.date != undefined && this.myForm.value.no_of_days != undefined){
      var targetDate = new Date(this.newmemo.date);
      this.myForm.controls['due_date'].patchValue(this.dateConversion(targetDate.setDate(targetDate.getDate() + parseInt(this.myForm.value.no_of_days))));
    }
  }

  dateToTimeStamp(str){
	  var date = str.split("/");
    var d = new Date(date[0], date[1] - 1, date[2]);
    return  d;
  }

  memoAdd() {
    const control = <FormArray>this.myForm.controls['memoDetails'];
    const addrCtrl = this.initMemoDtails();
    control.push(addrCtrl);
  }

  removePiece(i: number) {
    const control = <FormArray>this.myForm.controls['memoDetails'];
    control.removeAt(i);
  }

  save(formData,submit) {
    console.log(formData._value,JSON.parse(JSON.stringify(formData._value)));
    var newMemo = JSON.parse(JSON.stringify(formData._value));
    console.log(newMemo); 
    var memoPCDetails = JSON.parse(JSON.stringify(newMemo.memoDetails));
    delete newMemo.memoDetails;
    var memoData:any = [];
    for(var i = 0; i < memoPCDetails.length; i++){
      memoPCDetails[i].status = "ISSUED";
      memoData.push(Object.assign({}, newMemo, memoPCDetails[i]));
    }
    this.finalMemoData = memoData;
    console.log(memoData);
    
    if(submit){
      this._webservice.postmemo(memoData,"memoissue");
    }else{
      this.loadInvoiceComponent = true;
    }
  }

  

}
