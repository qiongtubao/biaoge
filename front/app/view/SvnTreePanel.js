Ext.define('BG.view.SvnTreePanel', {

	extend : 'Ext.tree.Panel',

	xtype : 'app-svn-treepanel',

	store : 'SvnTreeStore',

	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			title : 'SVN Tree',
			displayField : 'name',
			tbar : [{
				itemId : 'updateSVN',
				xtype : 'button',
				text : 'Update'
			}]
		});
		me.callParent(arguments);
	}

});