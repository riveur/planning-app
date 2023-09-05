<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return [
            'title' => ['required'],
            'formateur_id' => ['nullable', 'exists:users,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'groups' => ['array'],
            'days' => ['array'],
            'days.*' => ['string', Rule::in($days)],
            'start_date' => ['required', 'date', 'before_or_equal:end_date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'start_morning_time' => ['required', "regex:{$timeRegex}"],
            'end_morning_time' => ['required', "regex:{$timeRegex}"],
            'start_afternoon_time' => ['required', "regex:{$timeRegex}"],
            'end_afternoon_time' => ['required', "regex:{$timeRegex}"],
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'La date de fin doit être supérieure à la date de début.',
            'start_date.before_or_equal' => 'La date de début doit être supérieure à la date de fin.',
        ];
    }
}
