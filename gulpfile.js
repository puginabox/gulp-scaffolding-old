
//require is a node.js method
var gulped = require('gulp'),       //assign the gulp library to gulped variable
    gutil = require('gulp-util'),    // etc
    concat = require('gulp-concat'),
    compass = require('gulp-compass'), 
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify');


//--- Variable Declarations -  done separately, since assigns are based on the build
var environment,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    buildDirectory;

// NodeJS used to determine which build
environment = process.env.NODE_ENV || 'development';
/* 
    for Windoze users, just change this line to 
    environment = process.env.NODE_ENV || 'production';
*/
if (environment==='development') {
    buildDirectory = 'builds/development/'; 
        //dont forget trailing slash for concatination!
} else {
    buildDirectory = 'builds/production/';
}
 

    
//--- Variable Assignments
// Array in order of load. destintations plugged into variables for clarity
jsSources = [
//      'components/js/vendor/jquery/jquery.min.js', 
//      'components/js/vendor/modernizr/modernizr.min.js', 
//      'components/js/vendor/angular/angular.min.js',
//      'components/js/vendor/angular/angular-route.min.js',
//      'components/js/vendor/angular/angular-sanitize.min.js',
//      'components/js/vendor/angular/angular-animate.min.js',
        'components/js/app.js',
        'components/js/controllers/mainController.js',
        'components/js/controllers/page1Controller.js',
        'components/js/controllers/page2Controller.js',
        'components/js/directives/directives.js'        
        ];
sassSources = ['components/sass/master.scss'];
htmlSources = [buildDirectory + '*.html'];
jsonSources = [buildDirectory + 'js/*.json'];


//--- log message  task
gulped.task('welcome', function(){
    gutil.log('Gulp ready to go'); // log is a gulp-util method
});

//--- concatenate js task
gulped.task('js', function(){
    gulped.src(jsSources)
          .pipe(concat('behavior.js')) // name of concatendated file
          .pipe(browserify())    
    .pipe(gulped.dest(buildDirectory + 'js')) // destination of concatenation
          .pipe(connect.reload())
});

//--- Sass processing task
gulped.task('compass', function(){
    gulped.src(sassSources)
          .pipe(compass({
            sass: 'components/sass',
            image: buildDirectory + 'img',
            style: 'expanded'
          }))
          .on('error', gutil.log)
          .pipe(gulped.dest(buildDirectory + 'css'))
          .pipe(connect.reload())    
});

//---- Connect server & live-reloading task
gulped.task('connect', function(){
    connect.server({
        root: buildDirectory,
        livereload: true
    });
});

//---- html task
gulped.task('htmlChanges', function(){
    gulped.src(htmlSources)
    .pipe(connect.reload())
});

//---- json task
gulped.task('jsonChanges', function(){
    gulped.src(jsonSources)
    .pipe(connect.reload())
});

//--- Watch everything task
gulped.task('watch', function(){
    gulped.watch(jsSources, ['js']);
    gulped.watch('components/sass/**/*.scss', ['compass']);
    gulped.watch(htmlSources, ['htmlChanges']);
    gulped.watch(jsonSources, ['jsonChanges']);
});



gulped.task('default', ['welcome', 'htmlChanges', 'jsonChanges', 'js', 'compass', 'connect', 'watch']);



















