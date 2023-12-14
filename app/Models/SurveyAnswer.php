<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SurveyAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['survey_id','start_date','end_date'];
    public function survey():BelongsTo{
        return $this->belongsTo(Survey::class);
    }

    public function questionAnswer():HasOne{
        return $this->hasOne(SurveyQuestionAnswer::class);
    }
    
}
