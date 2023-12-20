<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SurveyQuestion extends Model
{
    use HasFactory;
    protected $fillable = ['type','question','description','survey_id','data'];

    public function survey():BelongsTo{
        return $this->belongsTo(Survey::class);
    }

    public function questionAnswer():HasMany{
        return $this->hasMany(SurveyQuestionAnswer::class);
    }

}

