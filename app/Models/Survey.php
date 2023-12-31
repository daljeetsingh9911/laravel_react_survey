<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = ['image','title','slug','description', 'user_id','expire_date'];

    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function question():HasMany{
        return $this->hasMany(SurveyQuestion::class);
    }

    public function surveryAnswer():HasMany{
        return $this->hasMany(SurveyAnswer::class);
    }
}
