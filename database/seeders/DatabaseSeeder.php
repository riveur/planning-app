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
            RoleSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
