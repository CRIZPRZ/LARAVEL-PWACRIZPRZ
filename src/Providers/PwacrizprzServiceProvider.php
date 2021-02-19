<?php

namespace Crizprz\Pwacrizprz\Providers;

use Carbon\Laravel\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Foundation\Application;


class PwacrizprzServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Blade::directive('PWACRIZPRZ',function(){
            return "<?php echo \$__env->make( 'PWA.metatags')->render(); ?>";
         });

        $this->loadRoutesFrom(__DIR__. '/../routes/web.php');
        $this->loadViewsFrom(__DIR__. '/../views', 'pwacrizprz');
        $this->registerassets();
        $this->registerIcons();
    }

    public function register()
    {
        $this->RegisterRoutes();
    }

    protected function registerassets()
    {
        $this->publishes([
            __DIR__.'/../Http/Controllers' => app_path('Http/Controllers')
        ], 'controller');

        $this->publishes([
            __DIR__.'/../assets/sw' => public_path(),
        ], 'public');

        $this->publishes([
            __DIR__.'/../assets/js/' => public_path('js'),
        ], 'public');

        $this->publishes([
            __DIR__.'/../views/PWA/' => resource_path('/views/PWA'),
        ], 'view');
    }

    protected function registerIcons()
    {
        $this->publishes([
            __DIR__.'/../assets/img' => public_path('img'),
        ], 'icons');

    }

    protected function RegisterRoutes()
    {
        if (Application::VERSION < 8) {
            $route = "Route::get('/offline','PwaController@offline');";
         }else {
            $route = "Route::get('/offline', [App\Http\Controllers\PwaController::class,'offline']);";

         }
        $doc = fopen( base_path('routes/web.php'), "r" );
        $cont = fread($doc, filesize(base_path('routes/web.php')));
        $pos = strpos($cont, $route);
        if (!$pos) {
            file_put_contents(base_path('routes/web.php'), $route, FILE_APPEND | LOCK_EX);
            return;
        }else{
            return;
        }
    }

}
