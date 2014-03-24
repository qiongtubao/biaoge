Ext.define('BG.view.SvnTreePanel', {

	extend : 'Ext.tree.Panel',

	xtype : 'app-svn-treepanel',

	store : 'SvnTreeStore',

	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			title : 'SVN Tree',
			displayField : 'name',
			rootVisible : false,
			tbar : [{
				itemId : 'updateSVN',
				xtype : 'button',
				text : 'Update'
			}],
			listeners : {
				beforeload : function(store, operation) {
					if(operation.node.isRoot()) {
						me.svnLoadMask = new Ext.LoadMask({
							msg : 'loading...',
							target : Ext.getBody()
						});
						me.svnLoadMask.show();
					}
				},
				load : function() {
					me.svnLoadMask && me.svnLoadMask.hide();
					me.svnLoadMask = null;
				}
			}
		});
		me.callParent(arguments);
	}

});