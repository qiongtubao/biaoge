Ext.define('BG.view.SheetProcessPanel', {

	extend : 'Ext.grid.Panel',

	xtype : 'app-sheet-process-panel',

	columns: [
		{ text: 'Name',  dataIndex: 'name', flex: 1 }
	],

	hideHeaders : true,

	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			viewConfig: {
				copy : true,
				plugins: {
					ptype: 'gridviewdragdrop',
					ddGroup: 'processDDGroup'
				},
				listeners : {
					scope: me,
					itemadd : this.onProcessChange,
					itemremove : this.onProcessChange
				}
			}
		});

		me.initContextMenu();

		me.callParent(arguments);
	},

	initContextMenu : function() {
		var me = this;
		var contextmenu = Ext.create('Ext.menu.Menu', {
			itemId: 'contextmenu',
			items : [{
				text: 'Delete',
				handler : function() {
					me.getSelectionModel().getSelection()[0].destroy();
				}
			}]
		});

		me.on({
			itemcontextmenu : function(view, record, item, index, e, opts) {
				e.stopEvent();
				contextmenu.showAt(e.getXY());
				return false;
			}
		});
	},

	onProcessChange : function() {
		var records = this.getStore().getRange();
		this.fireEvent('processorchange', [].concat(records));
	}

});