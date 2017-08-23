<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendors extends Model
{
    protected $fillable = [
            'name',
            'account_code',
            'opening_bal',
            'opening_bal_USD',
            'remarks',
            'contact_person',
            'address',
            'phone',
            'mobile',
            'email',
            'country',
            'fax_number',
            'RAP',
            'IDEX',
            'diamond_world_id',
            'QBC',
            'website',
            'credit_limit',
            'credit_limit_USD',
            'refernce_1',
            'reference_2',
            'GST',
            'PAN'
    ];
}

            
           