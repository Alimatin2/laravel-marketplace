<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    // Function that gets a time value and tries to format it to H:i
    public function normalizeTimeValue($date)
    {
        $timestamp = strtotime($date);
        if ($timestamp !== false) {
            $date = date('H:i', $timestamp);
        }

        return $date;
    }

    // Format the start and end time to H:i for comparison
    protected function prepareForValidation()
    {
        $this->merge([
            'start' => $this->normalizeTimeValue($this->start),
            'end' => $this->normalizeTimeValue($this->end),
        ]);
    }

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
            'name' => 'sometimes|string|max:255',
            'summary' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'required|numeric|min:50000',
            'session_duration' => 'sometimes|numeric|min:30|max:120',        
            'duration' => 'sometimes|numeric|min:7|max:30',
            'start' => 'required_with:end|date_format:H:i|before:end',
            'end' => 'required_with:start|date_format:H:i|after:start',
            'off_days' => 'sometimes|array',
            'off_days.*' => 'string',
            'status' => 'sometimes|boolean',
        ];
    }
}
