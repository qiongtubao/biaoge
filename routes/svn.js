(function(define) { 'use strict';
	define(function(require, exports, module) {

		var fs = require('fs');
		var fse = require('fs-extra');
		var cp = require('child_process');

		var SVN_REMOTE_PATH = 'https://192.168.1.20/svn/btg/seaking/disigner/%E6%95%B0%E5%80%BC%E6%96%87%E6%A1%A3numerical%20date/';

		var SVN_PATH = './svn';
		var SVN_CHECKOUT_FLAG_PATH = './svn/.biaoge_svn_checkout';
		var SVN_CHECKOUT_CMD = 'svn co --username zhengming ' +
									  '--password zhengmingQAZ ' +
										SVN_REMOTE_PATH;
		var SVN_UPDATE_CMD = 'svn update';
		var CD_CMD = 'cd $PATH';

		(function() {

			var _self = this;

			this.update = function(req, res) {
				if(_self.hasCheckout()) {
					_self.updateSVN(req, res);
				} else {
					_self.checkoutSVN(req, res);
				}
			};

			this.hasCheckout = function() {
				return fs.existsSync(SVN_CHECKOUT_FLAG_PATH);
			};

			this.updateSVN = function(req, res) {
				var update, cmd, args;
				var data = {
					success: true,
					code : 200,
					files: []
				};
				args = SVN_UPDATE_CMD.split(' ');
				cmd = args.shift();
				update = cp.spawn(cmd, args, {
					encoding : 'utf8',
					cwd : fs.realpathSync(SVN_PATH)
				});
				update.on('exit', function(code) {
					console.log('update svn code ' + code);
					data.code = code;
					_self.readdirInto(SVN_PATH, data.files, function() {
						res.end(JSON.stringify(data, null, ' '));
					});
				});
			};

			this.checkoutSVN = function(req, res) {
				console.log('checkout ...');
				var checkout, cmd, args;
				var data = {
					success: true,
					code : 200,
					files: []
				};
				if(fs.existsSync(SVN_PATH)) {
					fse.removeSync(SVN_PATH);
				}
				fs.mkdirSync(SVN_PATH);
				args = SVN_CHECKOUT_CMD.split(' ');
				cmd = args.shift();
				checkout = cp.spawn(cmd, args, {
					encoding : 'utf8',
					cwd : fs.realpathSync(SVN_PATH)
				});
				checkout.on('exit', function(code) {
					console.log('checkout code ' + code);
					data.code = code;
					_self.readdirInto(SVN_PATH, data.files, function() {
						fs.writeFileSync(SVN_CHECKOUT_FLAG_PATH, '', 'utf-8');
						res.end(JSON.stringify(data, null, ' '));
					});
				});
			};

			this.readdirInto = function(dir, outFiles, callback) {
				fs.readdir(dir, function(err, files) {
					if(err) {
						console.error(err);
						callback();
						return;
					}
					var count = files.length;
					function checkReady() {
						count --;
						if(count === 0) {
							callback();
						}
					}
					files.forEach(function(file, idx) {
						var item, stat;
						if(file.charAt(0) === '.') {
							checkReady();
							return;
						}
						stat = fs.statSync(dir + '/' + file);
						item = {
							name : file,
							leaf : !stat.isDirectory(),
							filePath : dir + '/' + file
						};
						if(!item.leaf) {
							item.files = [];
							_self.readdirInto(dir+'/'+file, item.files, checkReady);
						} else {
							checkReady();
						}
						outFiles.push(item);
					})
				});
			};

		}).call(module.exports);

	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

