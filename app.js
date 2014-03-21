(function(define) { 'use strict';
	define(function(require, exports, module) {

		var server = require("latte_server"),
			route = require("./routes/route") ;
		server.latte({
			gets: route.gets,
			posts: route.posts
		});

	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );