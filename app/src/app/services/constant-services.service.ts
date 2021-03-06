import { Injectable } from '@angular/core';
import { WebServicesService } from './web-services.service';


@Injectable()
export class ConstantServiceService {

  COUNRTIES:any;
  BROKERTYPES:any;
  NAMES:any;
  BROKERS:any;
  SHAPES:any;
  COLORS:any;
  GROUPS:any;
  CLARITY:any;
  SIZES:any;
  TAXES:any;
  DOLAR:any;
  INVOICE:any;
  LAB_TYPE:any;
  COMPANYNAME:any;

  constructor(private _webservice : WebServicesService) {
    this.BROKERTYPES = ["Flat","Slab"];
    
    this.COUNRTIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    
    this.NAMES = ["ANAND GHAN DIAM","RATNAKALA EXPORT","KANTILAL CHOTILAL","HARISH DIAM","R. KANTILAL & CO.","S. R. DIAMONDS HK LTD.","MIZRAHI TRFAHOT","JB BROTHERS","SUKEN EXPORT","SUR GEM"];
    
    this.BROKERS = ["Tiffany Case","Jenny Flex","Barb Akew","Marsha Mellow","Hazel Nutt","Ann Chovey","Chris P. Bacon","Olive Yew","Teri Dactyl","Allie Grater"];

    this.SHAPES = ["ROUND BRILLIANT CUT","PRINCESS CUT","MARQUISE CUT","CUSHION CUT","EMERALD CUT","RADIANT CUT","PEAR SHAPED","OVAL CUT","ASSCHER CUT"];

    this.COLORS = ["BLUE","GREEN","RED","GRAY","COLORLESS","YELLOW"];

    this.GROUPS = ["RAPNET","GENERAL STOCK"];

    this.CLARITY = ["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1","I2","I3"];

    this.SIZES = ["S","L","ES","EL","M"];

    this.TAXES = ["GST"];

    this.DOLAR = 65;

    this.INVOICE = "INVOICE-"+Math.ceil(Math.random()*10000);

    this.LAB_TYPE = ["GIA","IGI","HRDA"];

    // this._webservice.getCompany().subscribe(response=>
    //   this.COMPANYNAME=response
    // );

  }

}
