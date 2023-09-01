<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{

    protected $fillable = [
        'date',
        'start_morning_date',
        'end_morning_date',
        'start_afternoon_date',
        'end_afternoon_date',
    ];

    use HasFactory;

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
