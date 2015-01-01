// testing grounds
console.log('tests:');


//============================ jQuery namespaced ===============//
(function() {
    var $ = require('jquery');
    $('body').css('background', 'green');
    console.log('Hi from jQuery!');
})();
//}).call(this);