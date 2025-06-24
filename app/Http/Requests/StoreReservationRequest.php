<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'summary' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:50000',
            'session_duration' => 'required|numeric|min:30|max:120',
            'duration' => 'required|numeric|min:7|max:30',
            'start' => 'required|date_format:H:i|before:end',
            'end' => 'required|date_format:H:i|after:start',
            'off_days' => 'nullable|array',
            'off_days.*' => 'string',
            'status' => 'required|boolean',
        ];
    }
}
