import { Component, OnInit,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  @Input('companygroup') companyform :FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
