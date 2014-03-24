Ext.define('BG.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
		'Ext.tab.Panel',
		'BG.view.SvnTreePanel'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'app-svn-treepanel',
		region : 'west',
		split: true,
		width: '20%'
    }, {
		xtype: 'tabpanel',
		region : 'center',
		width: '80%'
	}]
});
