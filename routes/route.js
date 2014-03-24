(function(define) { 'use strict';
	define(function(require, exports, module) {
		var fs = require("fs");

		var tool = require("./tool");
		var svn = require('./svn');
		(function() {
			this.gets = {
				"/tool/download":tool.download,

				/* svn */
				"/svn/update" : svn.update
			};
			this.posts = {
				"/tool/upload": tool.upload
			}
		}).call(module.exports);
	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

