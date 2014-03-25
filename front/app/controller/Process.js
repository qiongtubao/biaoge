Ext.define('BG.controller.Process', {

	requires : [
		'BG.view.EditProcessWindow'
	],

	extend : 'Ext.app.Controller',

	stores : [
		'ProcessStore'
	],

	refs: [{
		ref: 'processPanel',
		selector: 'app-process-panel'
	}],

	init : function() {
		this.control({
			'app-process-panel #addProcess' : {
				click : this.onAddProcessBtnClick
			},
			'app-process-panel #delProcess' : {
				click : this.onDelProcessBtnClick
			},
			'app-process-panel #editProcess' : {
				click : this.onEditProcessBtnClick
			}
		});
	},

	onAddProcessBtnClick : function() {
		var me = this;
		var win = Ext.create('BG.view.EditProcessWindow', {
			action : 'add',
			listeners: {
				aceinit : function() {
					win.setContents('');
				},
				requestSave : function(name, code) {
					me.getStore('ProcessStore').add({
						name : name,
						code : code
					});
					win.close();
				}
			}
		});
		win.show();
	},

	onDelProcessBtnClick : function() {
		var record = this.getProcessPanel().getSelectionModel().getSelection()[0];
		record && record.destroy();
	},

	onEditProcessBtnClick : function() {
		var record = this.getProcessPanel().getSelectionModel().getSelection()[0];
		if(!record) return;
		var win = Ext.create('BG.view.EditProcessWindow', {
			action : 'edit',
			listeners: {
				aceinit : function() {
					win.setContents(record.get('code'));
				},
				requestSave : function(name, code) {
					record.set('code', code);
					win.close();
				}
			}
		});
		win.show();
	}
});