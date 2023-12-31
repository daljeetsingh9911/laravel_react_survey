<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $userID = Auth::user()->id;
        $total = Survey::where("user_id", $userID)->count();
        $surveys = Survey::where("user_id", $userID)->latest('created_at')->first();

        if(!empty($surveys)){
            $surveys->question();
        }

        $surveyAnswers =  SurveyAnswer::query()
                            ->join("surveys", "survey_answers.survey_id", "=" ,"surveys.id")
                            ->where("surveys.user_id", $userID)->count();
        $lastest_answers =  SurveyAnswer::query()
                                ->join("surveys", "survey_answers.survey_id","=","surveys.id" )
                                ->orderBy('end_date', 'DESC')->get();
        return  [
            "total"=>$total,
            "surveys"=>$surveys?(new SurveyResource($surveys)):[],
            "total_answers"=>$surveyAnswers,
            "lastest_answers"=>$lastest_answers
        ];

    }
}
