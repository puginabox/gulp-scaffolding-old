
//require is a node.js method
var gulped = require('gulp'),       //assign the gulp library to gulped variable
    gutil = require('gulp-util'),    // etc
    concat = require('gulp-concat'),
    compass = require('gulp-compass'), 
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify');


//--- Variable Declarations -  done separately, since assigns are based on the build
var environment,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    buildDirectory,
    sassStyle;

//--- NodeJS used to determine which build
environment = process.env.NODE_ENV || 'development';
/* 
    for Windoze users, just change this line to 
    environment = process.env.NODE_ENV || 'production';
*/
if (environment==='development') {
    buildDirectory = 'builds/development/'; 
        //dont forget trailing slash for concatination!
    sassStyle = 'expanded';
} else {
    buildDirectory = 'builds/production/';
    sassStyle = 'compressed';
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
    // log is a gulp-util method
    gutil.log('Gulp ready to go, with a ' + environment + ' build!'); 
    gutil.log('default build is dev, but run this command to change to production: NODE_ENV=production gulp');
});

//--- concatenate js task
gulped.task('js', function(){
    gulped.src(jsSources)
          .pipe(concat('behavior.js')) // name of concatendated file
          .pipe(browserify()) 
          .pipe(gulpif(environment=== 'production', uglify()))     
    .pipe(gulped.dest(buildDirectory + 'js')) // destination of concatenation
          .pipe(connect.reload())
});

//--- @COMPASS Sass processing task
gulped.task('compass', function(){
    gulped.src(sassSources)
          .pipe(compass({
            sass: 'components/sass',
            image: buildDirectory + 'img',
            style: sassStyle
          }))
          .on('error', gutil.log)
          .pipe(gulped.dest(buildDirectory + 'css'))
          .pipe(connect.reload())    
});

//---- @CONNECT server & live-reloading task
gulped.task('connect', function(){
    connect.server({
        root: buildDirectory,
        livereload: true
    });
});

//---- @HTML task
gulped.task('htmlChanges', function(){
    gulped.src(htmlSources)
    .pipe(connect.reload())
});

//---- @JSON task
gulped.task('jsonChanges', function(){
    gulped.src(jsonSources)
    .pipe(connect.reload())
});

//--- @WATCH everything task
gulped.task('watch', function(){
    gulped.watch(jsSources, ['js']);
    gulped.watch('components/sass/**/*.scss', ['compass']);
    gulped.watch(htmlSources, ['htmlChanges']);
    gulped.watch(jsonSources, ['jsonChanges']);
});



gulped.task('default', ['welcome', 'htmlChanges', 'jsonChanges', 'js', 'compass', 'connect', 'watch']);



















