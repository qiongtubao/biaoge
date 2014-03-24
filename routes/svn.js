(function(define) { 'use strict';
	define(function(require, exports, module) {

		var fs = require('fs');
		var fse = require('fs-extra');
		var cp = require('child_process');

		var SVN_REMOTE_PATH = 'https://192.168.1.20/svn/btg/seaking/disigner/';

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

			};

			this.checkoutSVN = function(req, res) {
				var checkout, cmd, args;
				var data = {
					success : true
				};
				fs.readdir(SVN_PATH, function(err, files) {
					files.forEach(function(file, idx) {
						var stat = fs.statSync(SVN_PATH + '/' + file);
						files[idx] = {
							name : file,
							leaf : !stat.isDirectory
						};
					})
					data.files = files;
					res.end(JSON.stringify(data));
				});
				return;
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

					res.end(code);
				});
			};

		}).call(module.exports);

	});
})(typeof define === 'function'  ? define : function (factory) { factory(require, exports, module); } );

