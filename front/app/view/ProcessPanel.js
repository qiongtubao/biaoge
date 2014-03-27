Ext.define('BG.view.ProcessPanel', {

	extend : 'Ext.grid.Panel',

	xtype : 'app-process-panel',

	title: 'Process',

	columns: [
		{ text: 'Name',  dataIndex: 'name', flex: 1 }
	],

	store : 'ProcessStore',

	hideHeaders : true,

	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			viewConfig: {
				copy : true,
				plugins: {
					ptype: 'gridviewdragdrop',
					dragGroup: 'processDDGroup',
					enableDrop: false
				}
			},
			tbar : [{
				itemId : 'addProcess',
				text: '+'
			}, {
				itemId : 'delProcess',
				text: '-'
			}, {
				itemId : 'editProcess',
				text: '*'
			}]
		});

		me.callParent(arguments);
	}

});