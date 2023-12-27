<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // TODO: Implement toArray() method for question or cast the question.data in array insead of null.
        return [
            'id'=> $this->id,
            'title'=> $this->title,
            'slug'=> $this->slug,
            'status'=> $this->status,
            'expire_date'=> date('d-M-Y',strtotime($this->expire_date)),
            'created_at'=> date('d-M-Y',strtotime($this->created_at)),
            'user_id'=> $this->user_id,
            'image'=> $this->image,
            'description'=> $this->description,
            'questions'=> $this->question,
            'total_answers'=> $this->surveryAnswer
        ];
    }
}
