<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $timeRegex = '/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/';
        return [
            'title' => ['required'],
            'description' => ['required'],
            'formateur_id' => ['nullable', 'exists:users,id'],
            'groups' => ['array'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'start_morning_time' => ['required', "regex:{$timeRegex}"],
            'end_morning_time' => ['required', "regex:{$timeRegex}"],
            'start_afternoon_time' => ['required', "regex:{$timeRegex}"],
            'end_afternoon_time' => ['required', "regex:{$timeRegex}"],
        ];
    }
}
