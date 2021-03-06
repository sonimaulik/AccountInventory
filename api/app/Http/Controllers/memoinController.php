<?php

namespace App\Http\Controllers;
use \App\MemoIn;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\DB;

class memoinController extends Controller
{
    
    public function memoinEntry(){
        $new_memoIn = Request::all();
        $memoIn_table = new \App\MemoIn;
        DB::table('memo_in')->insert($new_memoIn);
    } 

    public function memoinReport(){
        $memo = \App\MemoIn::all();
        return $memo;
    } 

    public function editMemoin(){
        $oldmemo = Request::all();
        $oldmemo_data = \App\MemoIn::find($oldmemo['$Stock_ID']);
        $newMemo = Request::all();
        $memoIn_table = new \App\MemoIn;
        $memoIn_table = MemoIn::find($newMemo['$Stock_ID']);
        foreach($newMemo as $fields){
            if($fields != "Stock_ID"){
                $memoIn_table->$fields = $newMemo[$fields];
            }
        }
        $memoIn_table->save();
    }

    public function deleteMemoin($Stock_ID=''){
        $data = Request::all();
        \App\MemoIn::where('id','=',$data['id'])->delete();
        $memoIn_table = new \App\MemoIn;
        MemoIn::where('Stock_ID','=',$data['Stock_ID'])->delete();
    }
   
    public function changeStatusDB($Stock_ID){
        $Stock_ID = $Stock_ID;
        $memoIn_table = \App\MemoIn::where(function($query) use($Stock_ID){
            $query->where('Stock_ID', '=', $Stock_ID)
                  ->orWhere('Lot_Number', '=', $Stock_ID);
        })->first();
        $memoIn_table->status = "RETURNED";
        $memoIn_table->due_date = date("Y/m/d");
        $memoIn_table->save();
    }

    public function show(Request $request){
        $params = Request::all();
        //  print_r($params);exit;
        if(!empty($params['staticdata'])){
            if($params['reportType'] == "report"){
                $labissue_data = \App\MemoIn::where('status','ISSUED')->get();
            }else
                $labissue_data = \App\MemoIn::where('status','RETURNED')->get();
            return response()->json($labissue_data,200);
        }
        if(!empty($params['filterby'])){

            if(!empty($params['search'])){
                if($params['filterby']=='PCS ID'){
                    if($params['reportType'] == "report"){
                        $response=\App\MemoIn::where('Stock_ID',$params['search'])->where('status','ISSUED')->get();
                    }else
                        $response=\App\MemoIn::where('Stock_ID',$params['search'])->where('status','RETURNED')->get();
                    return response()->json($response,200);
                }
                if($params['filterby']=='Invoice Number'){
                    if($params['reportType'] == "report"){
                        $response=\App\MemoIn::where('invoice_number',$params['search'])->where('status','ISSUED')->get();
                    }else
                        $response=\App\MemoIn::where('invoice_number',$params['search'])->where('status','RETURNED')->get();
                   return response()->json($response,200);
                }
                if($params['filterby']=='Party Name'){
                    if($params['reportType'] == "report"){
                        $response=\App\MemoIn::where('account_name',$params['search'])->where('status','ISSUED')->get();
                    }else
                        $response=\App\MemoIn::where('account_name',$params['search'])->where('status','RETURNED')->get();
                   return response()->json($response,200);
                }
                
            }
            if(!empty($params['fromdate']) && !empty($params['todate'])){
                if($params['fromdate'] || $params['todate']){
                    if($params['reportType'] == "report"){
                        $response=\App\MemoIn::whereBetween('date',[$params['fromdate'],$params['todate']])->where('status','ISSUED')->get();
                    }else
                        $response=\App\MemoIn::whereBetween('date',[$params['fromdate'],$params['todate']])->where('status','RETURNED')->get();
                        return response()->json($response,200);
                }
            }
            
        }
        if(!empty($params['filter'])){
            if($params['filter']=='all'){
                if($params['reportType'] == "report"){
                    $labissue_data = \App\MemoIn::where('status','ISSUED')->get();
                }else
                    $labissue_data = \App\MemoIn::where('status','RETURNED')->get();
                return response()->json($labissue_data,200);
            }
        }        
    }

    public function search(Request $request){
        $query = Request::all();
        foreach($query as $key=>$value){
            if($key != 'reportType'){
                if($key == 'Party Name' || $key == 'Party_Name'){
                    $q = 'account_name';
                    $query['account_name'] = $value;
                }
            }
        }        
        if(!empty($q)){
            if($query['reportType'] == "report"){
                $store=\App\MemoIn::select($q)->where($q,'like','%'.$query[$q].'%')->distinct()->pluck($q);
            }else
                $store=\App\MemoIn::select($q)->where($q,'like','%'.$query[$q].'%')->distinct()->pluck($q);
            return response()->json($store,200);
        }
        return response()->json([],200);
    }

    public function changestatus(){
        $MIn_data = Request::all();
        for($i = 0; $i<count($MIn_data); $i++){
            $this->changestatusDB($MIn_data[$i]);
        }
    }
}