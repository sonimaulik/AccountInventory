export interface newMemo {
    invoice_number: string;
    no_of_days: number;
    due_date:string;
    date:string;
    account_name:string;
    broker:string;
    reference:string;
    piecesTypes: memoDetails[];
}

export interface memoDetails{
    Stock_ID: number;
    Lot_Number: number;
    carats: number;
    rate:number;
    country:string;
}