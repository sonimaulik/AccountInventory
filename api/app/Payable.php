<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use App\Bills;
use Carbon\Carbon;
use DB;

class Payable extends Model
{
    public $timestamps = false;
    public static function collection(){
         $purchase = DB::table('purchase')
                        ->leftjoin('bills', 'purchase.invoice_number', '=', 'bills.invoice_number')
                        ->where('bills.invoice_number','=',null)
                        ->select('purchase.invoice_number','purchase.account_name','purchase.amount_INR as balance','purchase.amount_INR as invoice_value','purchase.purchase_date as date','purchase.due_date','purchase.company_name')
                        ->get();

            $reciept = Bills::select('invoice_number','account_name','balance','invoice_value','date','due_date','received','company_name')
                       ->where([['balance','>=',0],['credit_INR','=',null]])
                       ->latest()
                       ->get()
                       ->unique('invoice_number')
                       ->values()
                       ->where('balance','!=',0)
                       ->all();
            
             return $purchase->merge($reciept);
    }

    public static function search($term){
        if($term[key($term)]){
            $purchase = DB::table('purchase')
                            ->leftjoin('bills', 'purchase.invoice_number', '=', 'bills.invoice_number')
                            ->where('bills.invoice_number','=',null)
                            ->select('purchase.invoice_number','purchase.account_name','purchase.amount_INR as balance')
                            ->where('purchase.'.key($term),'like','%'.$term[key($term)].'%')
                            ->pluck(key($term));
                        

            $reciept = Bills::select('invoice_number','account_name','balance')
                       ->where([['balance','>=',0],['debit_INR','!=',0],[key($term),'like','%'.$term[key($term)].'%']])
                       ->latest()
                       ->get()
                       ->unique('account_name')
                       ->values()
                       ->where('balance','!=',0)
                       ->pluck(key($term));
                       
            
            return $purchase
                        ->merge($reciept)
                        ->unique()
                        ->values()
                        ->all();

        }
        return [];
    }

    public static function betweenDates($from,$to){
        $from=Carbon::parse($from)->addDays(1)->toDateString();
        $to=Carbon::parse($to)->addDays(1)->toDateString();
        $purchase = DB::table('purchase')
                         ->leftjoin('bills', 'purchase.invoice_number', '=', 'bills.invoice_number')
                         ->where('bills.invoice_number','=',null)
                        ->select('purchase.invoice_number','purchase.account_name','purchase.amount_INR as balance','purchase.amount_INR as invoice_value','purchase.purchase_date as date','purchase.due_date','purchase.company_name')
                        ->whereBetween('purchase_date',[$from,$to])
                        ->get();

            $reciept = Bills::select('invoice_number','account_name','balance','invoice_value','date','due_date','received','company_name')
                       ->where([['balance','>=',0],['credit_INR','=',null]])
                       ->whereBetween('date',[$from,$to])
                       ->latest()
                       ->get()
                       ->unique('account_name')
                       ->values()
                       ->where('balance','!=',0)
                       ->all();
            
             return $purchase
                        ->merge($reciept)
                        ->unique()
                        ->values()
                        ->all();
    }
}
