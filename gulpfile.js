
//require is a node.js method
var gulped = require('gulp'); //assign the gulp library to gulped variable

// log is a gulp-util method
gulped.task('welcome', function(){
    console.log('Gulp ready to go');
});