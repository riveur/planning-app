<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'owner_id',
        'formateur_id'
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, foreignKey: 'owner_id');
    }

    public function formateur(): BelongsTo
    {
        return $this->belongsTo(User::class, foreignKey: 'formateur_id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, table: 'event_group');
    }
}
