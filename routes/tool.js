(function(define) { 'use strict';
	define(function(require, exports, module) {
		var latte = require("latte");
		var fs = require("fs");
		var xlsx = require("latte_xlsx");
		var defvaule = {
			"number": 0,
			"string": "",
			"array": []
		};
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
				console.log(data);
				fs.writeFileSync("./html/"+path, JSON.stringify(data), {encoding:"utf8",mode:438,flag:"w"});
				return ""+path;
			};
			this.download = function(req, res) {
				var get = req.get,
					sheetIndex = get.index || 0;
				console.log(get);
				function run(data) {
					//res.end(_self.writeFile("download/"+get.path.split("\\")[1], data));
					var data = _self.json(JSON.parse(get.json),data[data.sheets[sheetIndex]]);
					//_self.func(get.func, data);
					res.end(JSON.stringify(data));
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
				
			};
			this.toClass = function(value, glass)  {
				switch(glass) {
					case "stirng":
						return (value || "")+"";
					break;
					case "json":
						try{
							var json = JSON.parse(value);
							return json;
						}catch(e) {
							return {};
						}
					break;
					case "array":
						var array = [];
						if(value) {
							array.push(value);
						}
						return array;
					break;
					case "number":
						try {
							var n = Int.parse(value);
							return n;
						}catch(e){
							return 0;
						}
					break;
				}
			};
			this.createObject = function(obj, data) {
				switch(latte.getClassName(obj)) {
					case "string":
						var values = obj.split("|");
						var value = values[0];
						var type = values[1] || "number";
						return data[value] ||  defvaule[type] || 0;
					break;
					case "json":
						var result = {};
						for(var i in obj) {
							result[i] = _self.createObject(obj[i], data);
						}
						return result;
					break;
					case "array":
						var array = [];
						for(var i =0, len = obj.length; i < len; i++) {
							array.push(_self.createObject(obj[i],data));
						}
						return array;
					break;
					case "number":
						console.log(obj);
						return data[obj];
					break;
				}
			};
			this.json = function(json, data) {
				var result = {};
				for( var i = 0, len = data.length; i < len; i++ ){
					var row = data[i];
					if(row) {
						var rj = {}
						, id = row[0];
						var result = {};
						for(var j in json) {
							var value = json[j]
								,def = 0;
							rj[j] = _self.createObject(json[j], row);
							
						}
						result[id] = rj;
					}

				}
				return result;
			};
			this.func = function(func, data) {

			}
		}).call(module.exports);
	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );
