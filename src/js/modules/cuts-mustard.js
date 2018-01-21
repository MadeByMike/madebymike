var ensureCutsMustard = (function() {
    var scriptLoading = false;
    var scriptComplete = false;
    var queue = [];
    var test = ('IntersectionObserver' in window);
    var src = '/js/polyfill.js';
   
    return function(done) {

        if(scriptComplete || test) {
            // If script is complete or the test cuts mustard 
            // execute the callback immediately and return
            return done();
        } else {
            // If not complete add the callback an array
            queue.push(done);
        }
        
        // Load the polyfill script only if it's not already 
        // loading to ensure we only get it one instance
        if (!scriptLoading) {
            scriptLoading = true;

            // create the script element
            var script = document.createElement('script');
            script.src = src;

            // On load, drain the queue and execute the pending callbacks
            script.onload = function() {
                scriptComplete = true;
                queue.forEach(cb => {
                    cb();
                })
            };
            
            script.onerror = function() {
                done(new Error('Failed to load ' + src));
            };
            
            document.head.appendChild(script);
        }
    }

})();

export default ensureCutsMustard;