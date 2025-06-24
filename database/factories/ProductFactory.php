<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 1, 100) * 10000,
            'stock' => fake()->numberBetween(0, 100),
            'image' => fake()->imageUrl(),
            'discount' => fake()->numberBetween(0,100),
            'vendor_id' => fake()->numberBetween(1,5),
            'is_active' => fake()->boolean(),
        ];
    }
}
