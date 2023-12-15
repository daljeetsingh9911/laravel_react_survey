<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3',
            'description' => 'required|string|min:10',
            'expire_date' => 'required',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string',
            'questions.*.description' => 'required|string',
            'questions.*.type' => 'required|string',
            'questions.*.data' => [
                'sometimes',
                'array',
                function ($attribute, $value, $fail) {
                    // Get the selected type for the current question
                    $selectedType = $this->input(str_replace('.data', '.type', $attribute));
                    // Check if the type is one of ['checkbox', 'radio', 'select']
                    if (in_array($selectedType, ['checkbox', 'radio', 'select'], true)) {
                        // Check if the count is less than 2 and if there is an empty value in the data array
                        if (count($value) < 2 || in_array(null, $value, true) || in_array('', $value, true)) {
                            $fail("At least two non-empty options are required for $selectedType.");
                        }
                    }
                },
            ],
        ];        
        
    }
}
