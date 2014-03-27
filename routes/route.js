(function(define) { 'use strict';
	define(function(require, exports, module) {
		var fs = require("fs");

		var tool = require("./tool");
		var svn = require('./svn');
		var grid = require('./grid');
		var process = require('./process');
		(function() {
			this.gets = {
				"/tool/download":tool.download,

				"/svn/update" : svn.update,
				"/grid" : grid.getGridData,
				'/process/list' : process.list
			};
			this.posts = {
				"/tool/upload": tool.upload,
				'/process/create' : process.create,
				'/process/remove' : process.remove,
				'/process/update' : process.update
			}
		}).call(module.exports);
	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

