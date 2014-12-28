
//require is a node.js method
var gulped = require('gulp'),       //assign the gulp library to gulped variable
    gutil = require('gulp-util'),    //assign the gulp-util library to gulped variable
    concat = require('gulp-concat'),
    
    // Array in order of load. destintations plugged into variables for clarity
    jsSources = [
//        'components/js/vendor/jquery/jquery.min.js', 
//        'components/js/vendor/modernizr/modernizr.min.js', 
        'components/js/vendor/angular/angular.min.js',
        'components/js/vendor/angular-route/angular-route.min.js',
        'components/js/vendor/angular-sanitize/angular-sanitize.min.js',
        'components/js/vendor/angular-animate/angular-animate.min.js',
        'components/js/app.js',
        'components/js/controllers/mainController.js',
        'components/js/controllers/page1Controller.js',
        'components/js/controllers/page2Controller.js',
        'components/js/directives/directives.js'        
    ];

// log message
gulped.task('welcome', function(){
    gutil.log('Gulp ready to go'); // log is a gulp-util method
});

// concatenate js
gulped.task('js', function(){
    gulped.src(jsSources)
          .pipe(concat('behavior.js')) // name of concatendated file
          .pipe(gulped.dest('builds/development/js')) // destination of concatenated file
});