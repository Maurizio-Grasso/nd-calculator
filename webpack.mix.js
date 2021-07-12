let mix = require('laravel-mix');

mix.sass('src/sass/style.scss', 'css').options({processCssUrls: false});