(function(define) { 'use strict';
	define(function(require, exports, module) {
		var fs = require("fs");
		var xlsx = require("latte_xlsx");
		(function() {
			var _self = this;
			this.data = {};
			this.readXlsx = function(path, callback) {
				xlsx.read(path,(callback || function(err, data) {
					_self.data[path] = data;
				}));
			}
			this.upload = function(req, res) {
				var post = req.post;
				_self.readXlsx(post.files[0][1].path);
				res.end(JSON.stringify({
		        	filePath: post.files[0][1].path,
		        	fileName: post.files[0][1].name
		        }));
			};
			this.writeFile = function(path, data) {
				fs.writeFileSync("./html/"+path, data, {encoding:"utf8",mode:438,flag:"w"});
				return ""+path;
			};
			this.download = function(req, res) {
				var get = req.get;
				console.log(get);
				function run(data) {
					res.end(_self.writeFile("download/"+get.path.split("\\")[1], data[data.sheets[0]]));
				};
				if(_self.data[get.path]) {
					run(_self.data[get.path]);
				}else{
					_self.readXlsx(get.path, function(err, data) {
						if(err){
							res.end(JSON.stringify(err));
						}else{
							run(data);
						}
					});
				}
				
			}
		}).call(module.exports);
	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );
