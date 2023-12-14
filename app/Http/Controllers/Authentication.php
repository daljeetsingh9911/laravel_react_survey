<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class Authentication extends Controller
{
    public function registration(RegistrationRequest $request){
        $data = $request->validated();

        /** @var \App\Models\User */
        $user = User::create([
            "name"=>$data["fullName"],
            "email"=> $data["email"],
            "password"=> bcrypt($data["password"]),
        ]);

        $token = $user->createToken("main")->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    } 

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        $rememberMe = $credentials['rememberMe'] ?? false;

        unset($credentials['rememberMe']);

        if(!Auth::attempt($credentials, $rememberMe)){
            return response([
                'error' =>'incorrect credentials'
            ],400);
        }

        /** @var \App\Models\User */
        $user = Auth::user();

        $token = $user->createToken("main")->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
        
    }

    public function logout(Request $request){
        
        /** @var User $user*/
        $user = Auth::user();

        // revoke the token

        $user->currentAccessToken->delete();
        
        return response([
            'success' => true
        ]);
    }
}
