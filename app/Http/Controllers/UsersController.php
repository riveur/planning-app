<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Group;
use App\Models\Role;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all(['id', 'name']);
        $groups = Group::all(['id', 'name']);

        return Inertia::render('Users/New', compact('roles', 'groups'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $tempPassword = Str::random(12);

        $data = Arr::only($request->validated(), ['firstname', 'lastname', 'email', 'group_id', 'role_id']);
        $data['password'] = Hash::make($tempPassword);

        User::create($data);

        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = User::query()->with(['role', 'group'])->findOrFail($id);

        return Inertia::render('Users/Show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $user = User::find($id, ['id', 'firstname', 'lastname', 'email', 'group_id', 'role_id']);

        $roles = Role::all(['id', 'name']);
        $groups = Group::all(['id', 'name']);

        return Inertia::render('Users/Edit', compact('user', 'roles', 'groups'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->fill(Arr::only($request->validated(), ['firstname', 'lastname', 'email', 'group_id', 'role_id']));
        $user->save();

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index');
    }
}
