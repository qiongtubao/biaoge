Ext.define('BG.Application', {
    name: 'BG',

    extend: 'Ext.app.Application',

    views: [
    ],

    controllers: [
		'Svn',
		'Process'
    ],

    stores: [
		'SvnTreeStore',
		'ProcessStore'
    ]
});
