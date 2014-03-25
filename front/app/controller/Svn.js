Ext.define('BG.controller.Svn', {

	extend : 'Ext.app.Controller',

	stores : [
		'SvnTreeStore'
	],

	refs: [{
		ref: 'dataPanel',
		selector: 'app-data-panel'
	}],

	svnLoadMask : null,

	init : function() {
		var me = this;
		me.control({
			'viewport app-svn-treepanel #updateSVN' : {
				click : this.onUpdateSVNClick
			},
			'viewport app-svn-treepanel' : {
				itemdblclick : this.onFileItemDblClick
			}
		});
	},

	onUpdateSVNClick : function() {
		var store = this.getStore('SvnTreeStore');
		var root = store.getRootNode();
		store.load({
			node : root
		});
	},

	onFileItemDblClick : function(view, record) {
		var me = this;
		if(!record.isLeaf()) return;
		Ext.Ajax.request({
			url : '../grid',
			method : 'GET',
			params : {
				path : record.get('filePath')
			},
			success : function(resp) {
				var data = JSON.parse(resp.responseText);
				me.getDataPanel().setData(data.grid);
			}
		});
	}

});