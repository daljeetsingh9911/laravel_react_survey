<?php

use App\Http\Controllers\Authentication;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [Authentication::class,'logout'])->name('Logout');
    Route::get('/dashboard',[DashboardController::class,'index'])->name('Dashboard');
    Route::get('/survey/all', [SurveyController::class,'index']);
    Route::get('/survey/{survey}', [SurveyController::class,'getSurveyById']);
    Route::delete('/survey/{survey}', [SurveyController::class,'destroy']);
    Route::post('/survey/create', [SurveyController::class,'store']);
    Route::put('/survey/update/{survey}', [SurveyController::class,'update']);
    Route::post('/survey/update', [SurveyController::class,'put']);
});

// Public routes
Route::get('/public/survey/{slug}', [SurveyController::class,'getSurveyBySlug']);

Route::post('/registration', [Authentication::class,'registration'])->name('Registrations');
Route::post('/login', [Authentication::class,'login'])->name('Login');