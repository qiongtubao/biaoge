Ext.define('BG.Application', {
    name: 'BG',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
		'Svn'
    ],

    stores: [
        // TODO: add stores here
		'SvnTreeStore'
    ]
});
