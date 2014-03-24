Ext.define('BG.store.SvnTreeStore', {

	extend : 'Ext.data.TreeStore',

	fields : [
		{ name: 'name', type: 'string' },
		{ name: 'filePath', type: 'string' },
		{ name: 'children', type: 'auto' }
	],

	proxy : {
		type: 'ajax',
		url : '../svn/update',
		timeout : 60000 * 5,
		reader : {
			type : 'json',
			root : 'files'
		},
		create : function(operation, callback, scope) {
			this.update(operation, callback, scope);
		},

		destroy : function(operation, callback, scope) {
			this.update(operation, callback, scope);
		},

		update : function(operation, callback, scope) {
			var i = 0,
				recs = operation.getRecords(),
				len = recs.length;

			for (i; i < len; i++) {
				recs[i].commit();
			}
			operation.setCompleted();
			operation.setSuccessful();

			Ext.callback(callback, scope || this, [operation]);
		}
	}
});