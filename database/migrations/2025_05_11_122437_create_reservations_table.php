<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('summary')->nullable();
            $table->string('description')->nullable();
            $table->foreignId('vendor_id')->constrained('vendors');
            $table->time('start');
            $table->time('end');
            $table->integer('duration'); //How long the service is available
            $table->integer('session_duration'); //How long the session takes in minutes
            $table->json('off_days')->nullable();
            $table->boolean('status')->default(true);
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
