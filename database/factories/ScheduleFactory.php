<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $date = $this->faker->dateTime();
        return [
            'date' => $date->format('Y-m-d'),
            'start_morning_date' => $date->setTime(hour: 8, minute: 0)->format('Y-m-d H:i:s'),
            'end_morning_date' => $date->setTime(hour: 12, minute: 0)->format('Y-m-d H:i:s'),
            'start_afternoon_date' => $date->setTime(hour: 13, minute: 0)->format('Y-m-d H:i:s'),
            'end_afternoon_date' => $date->setTime(hour: 16, minute: 30)->format('Y-m-d H:i:s'),
        ];
    }
}
