<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PwaController extends Controller
{
    public function offline()
    {
        return view('PWA.offline');
    }
}
