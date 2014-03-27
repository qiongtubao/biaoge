Ext.define('BG.view.SheetPanel', {

	requires : [
		'BG.view.SheetProcessPanel'
	],

	extend : 'Ext.panel.Panel',

	sheetData : null,

	outputData : null,

	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			layout : 'anchor',
			items : [{
				xtype : 'panel',
				title : '原数据',
				layout : 'fit',
				anchor : '100% 40%',
				items : {
					xtype : 'textareafield',
					readonly : true,
					value : me.stringifyJSON(me.sheetData, 2)
				}
			}, {
				xtype : 'app-sheet-process-panel',
				title : '处理器',
				anchor : '100% 20%',
				listeners : {
					scope : me,
					processorchange : this.onProcessorChange
				}
			}, {
				xtype : 'panel',
				title : '输出',
				layout : 'fit',
				anchor : '100% 40%',
				items : {
					itemId : 'output',
					xtype : 'textareafield',
					readonly : true,
					value : me.stringifyJSON(me.outputData, 2)
				}
			}]
		});
		me.callParent(arguments);
	},

	stringifyJSON : function(data, level) {
		var me = this;
		var lcount = 0;
		var str = '[\n';
		for(var idx in data) {
			str += '  ' + JSON.stringify(data[idx]) + ',\n';
		}
		str += ']';
		return str;
	},

	onProcessorChange : function(records) {
		var outputData = this.doProcess(records, JSON.parse(JSON.stringify(this.sheetData)));
		this.down('#output').setValue(this.stringifyJSON(outputData, 2));
	},

	doProcess : function(records, sourceData) {
		var record = records.shift();
		if(record) {
			var outputData = this.wrapRun(record.get('code'), sourceData);
			return this.doProcess(records, outputData);
		} else {
			return sourceData;
		}
	},

	wrapRun : function(code, sourceData) {
		var outputData;
		try {
			eval(code);
		} catch(e) {
			outputData = e.stack;
			console.log(e);
		}
		return outputData;
	}

});