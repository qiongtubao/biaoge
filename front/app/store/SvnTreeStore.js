Ext.define('BG.store.SvnTreeStore', {

	extend : 'Ext.data.TreeStore',

	autoLoad : true,

	autoSync : true,

	fields : [
		{ name: 'name', type: 'string' }
	],

	proxy : {
		type: 'ajax',
		url : '../svn/update',
		reader : {
			type : 'json',
			root : 'files'
		}
	}
});