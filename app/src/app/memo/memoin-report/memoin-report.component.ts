import { Component, OnInit } from '@angular/core';
import { WebServicesService } from './../../services/web-services.service';
import { Search,SearchValues } from '../search.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-memoin-report',
  templateUrl: './memoin-report.component.html',
  styleUrls: ['./memoin-report.component.css'],
  providers: [WebServicesService]
})
export class MemoinReportComponent implements OnInit {

  mydata:any =  [];
  issued:any = [];
  returned:any = [];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  private searchterm=new Subject;
  searchatts=new Search(['all','filter'],['Stock ID','Invoice Number','Party Name','date']);
  searchvalues=new SearchValues(
    this.searchatts.filter[0],
    this.searchatts.filterby[0],
    null,
    new Date().toLocaleDateString(),
    new Date().toLocaleDateString()
  );

  titles=[];
  data=[];
  searchresult=[];
  query:any;
  
  constructor( 
    private _webservice : WebServicesService 
  ) { }

  memoInReturn:any = [];

  ngOnInit() {

    this._webservice.showmemoin({reportType:"report",staticdata:'data'}).subscribe(
      resData=>{
        this.issued=resData.map(function(el) {
          var o = Object.assign({}, el);
          o.memoinReturn = false;
          return o;
        });
      });

      this.searchterm
      .debounceTime(100)
      .switchMap(search=>this._webservice.searchmemoin({reportType:"report",filterby:this.searchvalues.filterby,searchterm:search}))
      .subscribe(result=>{
          
          // this.issued=result;
          
      });
  }

  search(searchvalue){
    this.searchterm.next(searchvalue);
  }

  issearchempty(){
    return this.searchresult.length;
  }

  setvalue(result){
    this.searchvalues.search=result;
    this.searchresult=[];
  }

  resetsearch(){
    this.searchvalues.search=null;
  }

  memoinReturn(){
    this._webservice.memoinchangestatus(this.memoInReturn).subscribe((response)=>{
      for(let j=0; j<this.memoInReturn.length; j++){
        for(var i=0; i<this.issued.length; i++){
          if(this.issued[i].Stock_ID == this.memoInReturn[j]){
            this.issued.splice(i,1);
          }
        }
      }
      this.memoInReturn = [];
    });
  }

  returnMemoin(memoinReturn,data){
    var dataID = data.Stock_ID;
    if(data.Stock_ID == undefined || data.Stock_ID == '' || data.Stock_ID == null){
        dataID = data.Lot_Number;
      }
    console.log(memoinReturn,dataID);
    if(memoinReturn == true){
      console.log(this.memoInReturn.indexOf(dataID))
      if(this.memoInReturn.indexOf(dataID) == -1){
        this.memoInReturn.push(dataID);
      }
    }else{
      console.log(this.memoInReturn.indexOf(dataID))
      if(this.memoInReturn.indexOf(dataID) != -1){
        var index = this.memoInReturn.indexOf(dataID);
        this.memoInReturn.splice(index,1);
      }
    }
    console.log(this.memoInReturn);
  }

  onSubmit(form:NgForm){
    if(this.searchvalues.filter=='all'){
      this.query=JSON.stringify(form.value);
      console.log(this.query);
    }
    if(this.searchvalues.filterby=='date'){
      this.query=JSON.stringify(form.value);
      console.log(this.query);
    }
    if(form.value.search!=null){
     this.query=JSON.stringify(form.value);
     console.log(this.query);
    }
    this.query = JSON.parse(this.query);
    this.query.reportType = "report";
    this.query = JSON.stringify(this.query);
    if(this.query){
      this._webservice.showmemoin(this.query).subscribe(response=>this.issued=response);
    }
    
  }


  public dateConversion(date){
    console.log(date);
    var dd = new Date(date).getDate();
    var mm = new Date(date).getMonth() + 1;
    var yyyy = new Date(date).getFullYear();
    var dateString = yyyy + "/" + mm + "/" + dd;
    return dateString;

  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }

  s2ab(s:string):ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
  }

  export(){
    var exportCSVdata:any = JSON.parse(JSON.stringify(this.issued));
    for(var i = 0; i<exportCSVdata.length; i++){
      for(var key in exportCSVdata[i]){
        if(exportCSVdata[i][key] == null){
          exportCSVdata[i][key] = '-'; 
        }
        if(key == "memoinReturn"){
          delete exportCSVdata[i][key];
        }
        
        if(key == "status"){
          delete exportCSVdata[i][key];
        } 
      }
    }
    if(exportCSVdata[0].sr_no != "Sr No."){
      exportCSVdata.unshift(
        {
          "Stock_ID": "Stock ID",
          "Lot_Number": "Lot Number",
          "invoice_number": "Memo Invoice Number",
          "date": "Date",
          "account_name": "Party Name",
          "broker": "Broker Name",
          "reference": "Reference",
          "carats": "Carat",
          "rate": "Rate",
          "no_of_days": "No of Days",
          "due_date": "Due Date",
          "country": "Country"
        }
      );
    }


    for(var i = 0; i<exportCSVdata.length; i++){
        exportCSVdata[i] = Object.keys(exportCSVdata[i]).map(function(k) { 
          return exportCSVdata[i][k]; 
        });
    }
    const ws = XLSX.utils.aoa_to_sheet(exportCSVdata);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		const wbout = XLSX.write(wb, { bookType:'xlsx', type:'binary' });
		saveAs(new Blob([this.s2ab(wbout)]), "LabIssueReport"+new Date().getTime()+".xlsx");
  }

}


