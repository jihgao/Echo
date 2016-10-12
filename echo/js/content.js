!(function(){
	var messages_store = [], delay=0;
	window.console.log = (function(){
	    var timer;
	    var plog = window.console.log;
	    return function(){
	    	var args = [].slice.call(arguments);
	    	if(!delay){
	    		plog.apply(plog, args);
	    	}else{
	    		messages_store.push(args[0]);
	    		if(timer) clearTimeout(timer);
	    		timer = setTimeout(function(){
	    		    plog.call(plog, {message: messages_store, tm: +(new Date())});
	    		    messages_store = [];
	    		}, delay);
	    	}
	      return true;
	    }
	})();

	window.addEventListener('message', function(message){
	    console.log('message', 'comes from:', message.origin, message.data, +(new Date()) );
	});

	window.fetch = (function(){
	    var timer = {};
	    var oldfetch = window.fetch;
	    return function(){
	        var args = arguments;
	        if([].slice.call(args).length && args[0]){
	            if(timer[args[0]]) clearTimeout(timer[args[0]]);
	            timer[args[0]] = setTimeout(function(){
	                console.log('fetching-request', 'comes from ', window.location.host, args[0], args[2], +(new Date()));
	                delete timer[args[0]];
	            }, delay);
	        }
	        return oldfetch.apply(this, arguments);
	    }
	})();
})();