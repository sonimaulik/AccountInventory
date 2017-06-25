export class Memo { 
   constructor( 
      public memo_invoice_number?: number, 
      public no_of_days?:number,
      public date?:number,
      public account_name?:string,
      public broker?:string,
      public reference?:string,
      public PCS_ID?:string,
      public carats?:string,
      public pending_pcs?:string,
      public pending_carats?:string,
      public stone_type?:string,
      public amount?:number,
      public return_date?:string,
      public status?:string
   ) {  } 
}