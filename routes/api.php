<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/add_product', [ProductController::class, 'add_product']);
Route::get('/get_all_product', [ProductController::class, 'get_all_product']);
Route::get('/get_edit_product/{id}', [ProductController::class, 'get_edit_product']);
Route::post('/update_product/{id}', [ProductController::class, 'update_product']);
Route::get('/delete_product/{id}', [ProductController::class, 'delete_product']);
