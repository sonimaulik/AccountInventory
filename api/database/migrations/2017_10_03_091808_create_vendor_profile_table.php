<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_profile', function (Blueprint $table) {
            $table->increments('id');
            $table->string('v_name');
            $table->integer('account_code');
            $table->double('opening_bal',20,2)->nullable();
            $table->double('opening_bal_USD',20,2)->nullable();
            $table->string('remarks')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('address');
            $table->string('phone')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->string('country');
            $table->string('fax_number');
            $table->string('RAP');
            $table->string('IDEX');
            $table->string('diamond_world_id');
            $table->string('QBC');
            $table->string('website')->nullable();
            $table->double('credit_limit');
            $table->double('credit_limit_USD');
            $table->string('reference_1')->nullable();
            $table->string('reference_2')->nullable();
            $table->string('GST');
            $table->string('PAN');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_profile');
    }
}
