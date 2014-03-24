Ext.define('BG.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
		'BG.view.SvnTreePanel'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-svn-treepanel'
    }]
});
