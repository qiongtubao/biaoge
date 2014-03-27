Ext.define('BG.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
		'Ext.tab.Panel',
		'Ext.grid.plugin.DragDrop',
		'BG.view.SvnTreePanel',
		'BG.view.ProcessPanel',
		'BG.view.FlowPanel',
		'BG.view.DataPanel'
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
		region : 'east',
		width: '30%',
		split : true,
		items : [{
			xtype : 'app-process-panel'
		}, {
			xtype : 'app-flow-panel'
		}]
	}, {
		xtype: 'app-data-panel',
		width : '50%',
		split : true,
		region: 'center'
	}]
});
