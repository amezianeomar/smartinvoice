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
        Schema::table('users', function (Blueprint $table) {
            $table->string('ice')->nullable();
            $table->string('patente')->nullable();
            $table->string('taux_tva_defaut')->nullable();
            $table->string('adresse_siege')->nullable();
            $table->string('logo_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['ice', 'patente', 'taux_tva_defaut', 'adresse_siege', 'logo_path']);
        });
    }
};
