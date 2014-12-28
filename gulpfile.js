
//require is a node.js method
var gulped = require('gulp'),       //assign the gulp library to gulped variable
    gutil = require('gulp-util'),    //assign the gulp-util library to gulped variable
//    sass = require('sass'),
    
    // destintations plugged into variables for clarity
    jsSources = ['js/*.js', 'js/file2.js', 'js/file3.js'];
    
; 
gulped.task('welcome', function(){
    gutil.log('Gulp ready to go'); // log is a gulp-util method
});
//gulped.task('task1', function(){
//    gulped.src(jsSources); // src method as input
//          .pipe(sass());
//});