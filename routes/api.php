<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Rotas da API
Route::apiResource('tasks', TaskController::class);