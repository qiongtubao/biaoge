(function(define) { 'use strict';
	define(function(require, exports, module) {

		var fs = require('fs');
		var fse = require('fs-extra');

		var PROCESS_FILE = './data/processes.json';

		(function() {

			var _self = this;

			function parseParams(post) {
				var params = {};
				var fields = post.fields;
				fields.forEach(function(field) {
					params[field[0]] = field[1];
				});
				return params;
			}

			this.createResponse = function(err, processes) {
				var data = {
					success : err ? false : true,
					error : err,
					processes : processes
				};
				return JSON.stringify(data, null, ' ');
			};

			this.readProcesses = function(callback) {
				fse.readJson(PROCESS_FILE, function(err, data) {
					callback(err, data);
				});
			};

			this.list = function(req, res) {
				_self.readProcesses(function(err, processes) {
					res.end(_self.createResponse(err, processes));
				});
			};

			this.create = function(req, res) {
				var name = req.post.fields[0][1];
				var code = req.post.fields[1][1];
				if(!name || !code) {
					res.end(_self.createResponse('illegal arguments', []));
					return;
				}
				_self.readProcesses(function(err, processes) {
					var process;
					if(err) {
						res.end(_self.createResponse(err, processes));
						return;
					}
					process = {
						name : name,
						code : code
					};
					processes.push(process);
					fse.writeJson(PROCESS_FILE, processes, function(err, data) {
						res.end(_self.createResponse(err, [process]));
					});
				});
			};

			this.remove = function(req, res) {
				var params = parseParams(req.post);
				var name = params.name;
				if(!name) {
					res.end(_self.createResponse('illegal arguments', []));
					return;
				}
				_self.readProcesses(function(err, processes) {
					var process;
					if(err) {
						res.end(_self.createResponse(err, processes));
						return;
					}
					processes.forEach(function(p, idx) {
						if(p.name === name) {
							process = processes.splice(idx, 1)[0];
							return false;
						}
					});
					fse.writeJson(PROCESS_FILE, processes, function(err, data) {
						res.end(_self.createResponse(err, []));
					});
				});
			};

			this.update = function(req, res) {
				var params = parseParams(req.post);
				var name = params.name;
				var code = params.code;
				if(!name || !code) {
					res.end(_self.createResponse('illegal arguments', []));
					return;
				}
				_self.readProcesses(function(err, processes) {
					var process;
					if(err) {
						res.end(_self.createResponse(err, processes));
						return;
					}
					processes.forEach(function(p, idx) {
						if(p.name === name) {
							p.code = code;
							process = p;
							return false;
						}
					});
					fse.writeJson(PROCESS_FILE, processes, function(err, data) {
						res.end(_self.createResponse(err, [process]));
					});
				});
			};

		}).call(module.exports);

	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

