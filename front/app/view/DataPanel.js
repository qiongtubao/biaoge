Ext.define('BG.view.DataPanel', {

	requires : [
		'Ext.form.field.TextArea',
		'BG.view.SheetPanel'
	],

	extend : 'Ext.tab.Panel',

	xtype : 'app-data-panel',

	setData : function(data) {
		var me = this;
		me.removeAll(true);

		var sheets = data.sheets;
		sheets.forEach(function(sheetName, idx) {
			var tableData = data[sheetName];
			var dataView = Ext.create('BG.view.SheetPanel', {
				title : sheetName,
				sheetData : tableData
			});
			me.add(dataView);
			if(idx === 0) {
				me.setActiveTab(dataView);
			}
		});
	}

});