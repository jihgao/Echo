!(function(){
	var messages_store = [], delay=0, is_pretty=true;
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
		var out_parts = [window.location.host, 'received message which comes from:', message.origin, message.data];
		if(is_pretty){
			out_parts = out_parts.concat(['\n', JSON.stringify(message.data, null, 4), '\n']);
		}
		console.log.apply(null, out_parts);
	});
})();
