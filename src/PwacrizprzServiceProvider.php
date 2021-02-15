<?php

namespace Crizprz\Pwacrizprz;

use Carbon\Laravel\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class PwacrizprzServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Blade::directive('PWACRIZPRZ',function(){
            return '<link rel="manifest" href="/manifest.json"><script src="/js/registerSW.js" charset="utf-8"></script>';

         });

        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views', 'pwacrizprz');
        $this->registerassets();
        $this->registerIcons();

    }

    public function register()
    {

    }

    protected function registerassets()
    {

        $this->publishes([
            __DIR__.'/assets/sw/' => public_path(),
        ], 'public');

        $this->publishes([
            __DIR__.'/assets/js/' => public_path('js'),
        ], 'public');

    }

    protected function registerIcons()
    {
        $this->publishes([
            __DIR__.'/assets/img/icons' => public_path('img/icons'),
        ], 'icons');
    }
}
