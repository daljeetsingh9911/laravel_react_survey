<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['survery_question_id', 'survey_answer_id', 'answer'];

    public function question():BelongsTo{
        return $this->belongsTo(SurveyQuestion::class);
    }

    public function answer():BelongsTo{
        return $this->belongsTo(SurveyAnswer::class);
    }
}
