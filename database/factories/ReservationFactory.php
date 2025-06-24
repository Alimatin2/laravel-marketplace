<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'summary' => fake()->sentence(),
            'description' => fake()->sentences(3, true),
            'vendor_id' => fake()->numberBetween(1,5),
            'start' => fake()->numberBetween(8,10),
            'end' => fake()->numberBetween(16, 20),
            'duration' => 14,
            'session_duration' => 60,
            'off_days' => fake()->randomElements(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 2),
            'status' => fake()->boolean(),
            'price' => fake()->numberBetween(10, 60) * 100000,
        ];
    }
}
