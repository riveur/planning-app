<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            GroupSeeder::class,
            RoleSeeder::class
        ]);

        User::factory()->count(10)->create();

        $user = User::factory()->createOne();

        Event::factory()
            ->count(10)
            ->has(Schedule::factory()->count(3))
            ->for($user, relationship: 'owner')
            ->create();
    }
}
