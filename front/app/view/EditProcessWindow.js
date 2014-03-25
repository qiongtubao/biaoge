Ext.define('BG.view.EditProcessWindow', {

	requires : ['Ext.window.MessageBox'],

	extend : 'Ext.window.Window',

	closable : true,

	layout : {
		type : 'fit'
	},

	aceEditor : null,

	action : 'add',

	modal : true,

	width: 1024,
	height: 500,

	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			title : 'Process',
			items: {
				itemId : 'aceEditor',
				xtype: 'component',
				layout : 'fit',
				autoEl: 'div',
				listeners : {
					scope: this,
					render: this.onTextAreaRender
				}
			},
			buttons : [{
				text: 'Save',
				handler : function() {
					if(me.action === 'add') {
						Ext.MessageBox.prompt('Process Name', 'Please enter process name:', function(btn, text){
							if (btn == 'ok'){
								me.fireEvent('requestSave', text, me.getContents());
							}
						});
					} else {
						me.fireEvent('requestSave', null, me.getContents());
					}
				}
			}, {
				text: 'Cancel',
				handler : function() {
					me.close();
				}
			}]
		});
		me.callParent(arguments);
	},

	onTextAreaRender : function() {
		var me = this;
		var dom = me.down('#aceEditor').getEl().dom;
		me.aceEditor = ace.edit(dom);
		me.aceEditor.setTheme("ace/theme/monokai");
		me.setMode('ace/mode/javascript');
		me.fireEvent('aceinit', this);
	},

	setMode : function(mode) {
		this.aceEditor.getSession().setMode(mode);
	},

	setContents : function(contents) {
		this.aceEditor.setValue(contents);
		this.aceEditor.clearSelection();
	},

	getContents : function() {
		return this.aceEditor.getValue();
	}
});