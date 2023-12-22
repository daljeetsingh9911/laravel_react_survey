<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\Survey;
use Illuminate\Database\QueryException;

class SurveyController extends Controller
{

    protected $inpType = ['radio','checbox','select'];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userID = Auth::user()->id;
        return  SurveyResource::collection(Survey::where('user_id', $userID)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();
        $userID = Auth::user()->id;

        try{
        //create a new survey
         $survey = Survey::create([
            'user_id' => $userID,
            'image' => '',
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'description'=>$data['description'],
            'expire_date'=>date('Y-m-d H:i:s', strtotime($data['expire_date'])),
         ]);
        } catch (QueryException $e) {
            // Handle the unique constraint violation error
            $errorCode = $e->getCode();
            $errorMessage = $e->getMessage();
            return response([
                'status' => 'error',
                'msg'=>$errorMessage
            ],400);
        }
        //create a new survey
        try{
            foreach ($data['questions'] as $k => $qus){
                $d = null;
                if(in_array($qus['type'],$this->inpType)){
                    $d =  json_encode($qus['data']);
                }
                // base on realsionship creating new questions
                $survey->question()->create([
                    'question' => $qus['question'],
                    'description' => $qus['description'],
                    'type' => $qus['type'],
                    'survey_id' => $survey->id,
                    'data'=>$d
                ]);
            }

            return response([
                'status' => 'success',
                'msg'=>'Survey has been created successfully'
            ]);
        } catch (QueryException $e) {
            // Handle the unique constraint violation error
            $errorCode = $e->getCode();
            $errorMessage = $e->getMessage();
            return response([
                'status' => 'error',
                'msg'=>$errorMessage
            ],400);
        }
     
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        return   Survey::get();
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {  
        $userID = Auth::user()->id;
        $surveyUserID =  $survey->user_id;

        if($userID != $surveyUserID){
            return response([
                'status' => 'error',
                'msg'=>'unAuthorized user request',
            ],400);
        }

        try {
            $survey->delete();
            return response([
                'status' => 'success',
                'msg'=>'data deleted successfully',
            ],200);
        }catch (QueryException $e) {
            // Handle the unique constraint violation error
            $errorCode = $e->getCode();
            $errorMessage = $e->getMessage();
            return response([
                'status' => 'error',
                'msg'=>$errorMessage
            ],400);
        }
       
    }
}
