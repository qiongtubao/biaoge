Ext.define('BG.store.ProcessStore', {

	extend : 'Ext.data.Store',

	fields : ['name', 'code'],

	autoLoad : true,
	autoSync : true,

	proxy : {
		type : 'ajax',
		api: {
			create  : '../process/create',
			read    : '../process/list',
			update  : '../process/update',
			destroy : '../process/remove'
		},

		reader : {
			type : 'json',
			root : 'processes'
		}
	}

});