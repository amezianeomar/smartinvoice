<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'montant', 'abonnement', 'statut', 'date_transaction'])]
class Paiement extends Model
{
    protected $casts = [
        'date_transaction' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
