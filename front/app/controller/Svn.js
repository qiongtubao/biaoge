Ext.define('BG.controller.Svn', {

	extend : 'Ext.app.Controller',

	stores : [
		'SvnTreeStore'
	],

	init : function() {
		this.control({
			'viewport app-svn-treepanel' : {
				render : this.onSVNTreePanelRender
			},
			'viewport app-svn-treepanel #updateSVN' : {
				click : this.onUpdateSVNClick
			}
		});
	},

	onSVNTreePanelRender : function(view) {
		var store = this.getStore('SvnTreeStore');
		var loading = new Ext.LoadMask(view, {
			store : store
		});
		store.load();
	},

	onUpdateSVNClick : function() {

	}

});