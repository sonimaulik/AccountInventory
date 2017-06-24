import { Component, OnInit } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { SelectModule } from 'ng2-select';
import { Purchase } from './purchase';
import { WebServicesService } from './../services/web-services.service';
import { ConstantServicesService } from './../services/constant-services.service';
import { DatepickerModule } from 'angular2-material-datepicker'

export abstract class AbstractViewInit {
  ngAfterViewInit() {
    console.log('after View init');
  }
}

@Component({
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [WebServicesService,ConstantServicesService]
})
export class PurchaseComponent implements OnInit, AbstractViewInit {

  date: DateModel;
  options: DatePickerOptions;
  newpurchase = new Purchase();
  
  constructor( 
    private _webservice : WebServicesService,
    public ConstantService : ConstantServicesService 
  ) { 
    this.options = new DatePickerOptions();
  }

  ngOnInit() {}

  ngAfterViewInit(){}
  
  public countries:Array<string> = this.ConstantService.COUNRTIES;
  public brokertypes:Array<string> = this.ConstantService.BROKERTYPES;
  public names:Array<string> = this.ConstantService.NAMES;
  public brokers:Array<string> = this.ConstantService.BROKERS;
  public shapes:Array<string> = this.ConstantService.SHAPES;
  public colors:Array<string> = this.ConstantService.COLORS;
  public groups:Array<string> = this.ConstantService.GROUPS;
  public clarity:Array<string> = this.ConstantService.CLARITY;
  public sizes:Array<string> = this.ConstantService.SIZES;
  public taxes:Array<string> = this.ConstantService.TAXES;

  public less:any = {};
  public comission:any = {};
  private value:any = {}; 
  private _disabledV:string = '0';
  private disabled:boolean = false;
  
  public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    console.log('Selected value is: ', value,this.options);
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

  public calcDay(value:any):void{
    console.log(typeof value,this.newpurchase.purchase_date,this.newpurchase.payment_terms);
    var date;
    if(this.newpurchase.purchase_date != undefined && this.newpurchase.payment_terms != undefined){
      var targetDate = new Date(this.newpurchase.purchase_date);
      targetDate.setDate(targetDate.getDate() + parseInt(this.newpurchase.payment_terms));
      var dd = targetDate.getDate();
      var mm = targetDate.getMonth() + 1; 
      var yyyy = targetDate.getFullYear();
      var dateString = yyyy + "/" + mm + "/" + dd;
      console.log(dateString);
      this.newpurchase.due_date = dateString;
    }
  }

  public RPCaratCost(){
    console.log("afqw23r23");
    if(this.newpurchase.RAP_price != undefined && this.newpurchase.cost_discount != undefined){
      console.log(this.newpurchase.RAP_price-(this.newpurchase.RAP_price*this.newpurchase.cost_discount/100));

      this.newpurchase.cost_rate_per_carat = this.newpurchase.RAP_price-(this.newpurchase.RAP_price*this.newpurchase.cost_discount/100);
    }
  }

  public WDRPCarat(){
    console.log("afqw23r23");
    if(this.newpurchase.cost_rate_per_carat != undefined && this.newpurchase.wd_rate   != undefined){
      console.log("afqw");
      this.newpurchase.wd_rate_carat = this.newpurchase.cost_rate_per_carat+(this.newpurchase.cost_rate_per_carat*this.newpurchase.wd_rate/100);
    }
  }

  newpurchasedata:any;
  submitted = false;
  onSubmit() {
    
    this.submitted = true;
    this.newpurchase.less = JSON.stringify(this.less);
    this.newpurchase.comission = JSON.stringify(this.comission);
    this.newpurchasedata = JSON.parse(JSON.stringify(this.newpurchase));
    console.log(JSON.stringify(this.newpurchasedata));
    this.newpurchasedata.taxes = this.newpurchasedata.taxes[0].text;
    this.newpurchasedata.purchase_date = this.newpurchasedata.purchase_date.formatted;
    this.newpurchasedata.due_date = this.newpurchasedata.due_date.formatted;
    this.newpurchasedata.country = this.newpurchasedata.country[0].text;
    this.newpurchasedata.account_name = this.newpurchasedata.account_name[0].text;
    this.newpurchasedata.brokerName = this.newpurchasedata.brokerName[0].text;
    this.newpurchasedata.brokerType = this.newpurchasedata.brokerType[0].text;
    this.newpurchasedata.diamond_shape = this.newpurchasedata.diamond_shape[0].text; 
    this.newpurchasedata.diamond_color = this.newpurchasedata.diamond_color[0].text;
    this.newpurchasedata.stock_status_group = this.newpurchasedata.stock_status_group[0].text;
    this.newpurchasedata.broker_details = {
      brokerName : this.newpurchasedata.brokerName,
      brokerType : this.newpurchasedata.brokerType,
      brokerage : this.newpurchasedata.brokerage
    };
    this.newpurchasedata.broker_details = JSON.stringify(this.newpurchasedata.broker_details);

    console.log(JSON.stringify(this.newpurchasedata));
    this._webservice.postpurchasedata(this.newpurchasedata);
  }

}
