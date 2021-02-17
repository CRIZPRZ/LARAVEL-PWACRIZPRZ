<?php

namespace Crizprz\Pwacrizprz\Providers;

use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouterServiceProvider extends ServiceProvider
{
    protected $UrlName = 'Crizprz\Pwacrizprz\Http\Controllers';

    public function before(Router $router)
    {
        //
    }

    public function map(Router $router)
    {
        \Route::group(['middleware' => 'web', 'namespace' => $this->UrlName], function()
        {
            require(__DIR__.'/../routes/web.php');
        });
    }
}
