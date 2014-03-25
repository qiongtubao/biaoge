Ext.define('BG.view.FlowPanel', {

	extend : 'Ext.panel.Panel',

	xtype : 'app-flow-panel',

	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			title: 'Flow',
			layout : 'fit',
			items : []
		});

		me.callParent(arguments);
	}

});