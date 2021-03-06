import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerModule } from 'ng2-datepicker';
import { SelectModule } from 'ng2-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardStructureModule } from './../dashboard-structure/dashboard-structure.module';
import { MemoInComponent } from './memoin/memoin.component';
import { MemoRoutingModule } from './memo-routing.module';
// import { DatepickerModule } from 'angular2-material-datepicker';
import { MemoissueReportComponent } from './memoissue-report/memoissue-report.component';
import { MemoinReportComponent } from './memoin-report/memoin-report.component';
import { MemoDetailsComponent } from './memo-details/memo-details.component';
import { MemooutComponent } from './memoout/memoout.component';
// import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from './../filters/data-filter.pipe';
import {MaterialModule,MdDatepickerModule,MdNativeDateModule} from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MemoinReturnReportComponent } from './memoin-return-report/memoin-return-report.component';
import { MemoissueReturnReportComponent } from './memoissue-return-report/memoissue-return-report.component';
import { MemoInvoiceComponent } from './memo-invoice/memo-invoice.component';
import { MdRadioModule, DateAdapter, NativeDateAdapter, MD_DATE_FORMATS } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    DashboardStructureModule,
    DatePickerModule,
    SelectModule,
    FormsModule,
    MemoRoutingModule,
    // DatepickerModule,
    BrowserModule, 
    ReactiveFormsModule,
    MdDatepickerModule,
    MdRadioModule,
    MdInputModule
    // DataTableModule
  ],
  declarations: [
    MemoInComponent,    
    MemoissueReportComponent,
    MemoinReportComponent,
    MemoDetailsComponent,
    MemooutComponent,
    DataFilterPipe,
    MemoinReturnReportComponent,
    MemoInvoiceComponent,
    MemoissueReturnReportComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdDatepickerModule,
    MdInputModule,
    MdRadioModule,
    ReactiveFormsModule
  ]

})

export class MemoModule { }
