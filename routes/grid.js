(function(define) { 'use strict';
	define(function(require, exports, module) {

		var fs = require('fs');
		var fse = require('fs-extra');
		var xlsx = require("latte_xlsx");

		var SVN_PATH = './svn';

		(function() {

			var _self = this;

			this.getGridData = function(req, res) {
				var filePath = req.get.path;
				var data = {
					success : true,
					error : ''
				};
				xlsx.read(filePath, function(err, gridData) {
					if(err) {
						data.error = err;
						data.success = false;
					} else {
						data.grid = gridData;
					}
					res.end(JSON.stringify(data));
				});
			};

		}).call(module.exports);

	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

