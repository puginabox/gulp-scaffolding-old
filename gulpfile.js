
//require is a node.js method
var gulped = require('gulp'),       //assign the gulp library to gulped variable
    gutil = require('gulp-util'),    //assign the gulp-util library to gulped variable
    concat = require('gulp-concat'),
    compass = require('gulp-compass'), 
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify');
    
    // Array in order of load. destintations plugged into variables for clarity
var jsSources = [
//        'components/js/vendor/jquery/jquery.min.js', 
//        'components/js/vendor/modernizr/modernizr.min.js', 
//        'components/js/vendor/angular/angular.min.js',
//        'components/js/vendor/angular/angular-route.min.js',
//        'components/js/vendor/angular/angular-sanitize.min.js',
//        'components/js/vendor/angular/angular-animate.min.js',
        'components/js/app.js',
        'components/js/controllers/mainController.js',
        'components/js/controllers/page1Controller.js',
        'components/js/controllers/page2Controller.js',
        'components/js/directives/directives.js'        
    ];
var sassSources = 'components/sass/master.scss';
var htmlSources = 'builds/development/*.html';


//--- log message  task
gulped.task('welcome', function(){
    gutil.log('Gulp ready to go'); // log is a gulp-util method
});

//--- concatenate js task
gulped.task('js', function(){
    gulped.src(jsSources)
          .pipe(concat('behavior.js')) // name of concatendated file
          .pipe(browserify())    
          .pipe(gulped.dest('builds/development/js')) // destination of concatenation
          .pipe(connect.reload())
});

//--- Sass processing task
gulped.task('compass', function(){
    gulped.src(sassSources)
          .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/img',
            style: 'expanded'
          }))
          .on('error', gutil.log)
          .pipe(gulped.dest('builds/development/css'))
          .pipe(connect.reload())    
});

//---- Connect server & live-reloading task
gulped.task('connect', function(){
    connect.server({
        root: 'builds/components/',
        livereload: true
    });
});

//---- html task
gulped.task('html', function(){
    gulped.src(htmlSources)
    .pipe(connect.reload())
});

//--- Watch everything task
gulped.task('watch', function(){
    gulped.watch(jsSources, ['js']);
    gulped.watch('components/sass/**/*.scss', ['compass']);
    gulped.watch(htmlSources, ['html']);
});





gulped.task('default', ['welcome', 'js', 'compass', 'connect', 'watch']);



















