
function customGrid(args){
	var scope = this; //함수 자체에서 호출하는 것이 아닌 경우 scope사용

	var gridOption = {};
	var dataLoadOption = {};
	//var gridId;
	var columns;

	var dataView;
	var grid;

	var gridData = [];
	var commandQueue = [];
	var addData = [];
	var updateData = [];
	var originData = [];

	this.init = function() {
		gridOption = args;
		this.makeGrid();
	};

	this.makeGrid = function() {
		var gridId = gridOption.gridId;
		columns = gridOption.columns;
		var options = gridOption.options;
		options.editCommandHandler = this.queueAndExecuteCommand; //edit 하고 난 후 동작할 함수

		var checkbox = gridOption.checkbox;
		
		var excel_paste = gridOption.excel_paste; //엑셀 붙여 넣기 기능 사용

		if(typeof excel_paste == "undefined") {
			excel_paste = false;
		}
		
		$('#'+gridId).css("height",600);
		

		if(checkbox) {
			var checkboxSelector = new Slick.CheckboxSelectColumn({ 
				cssClass: "slick-cell-checkboxsel" 
			}); 

			columns.unshift(checkboxSelector.getColumnDefinition());
		}
		
		dataView = new Slick.Data.DataView();
		grid = new Slick.Grid("#"+gridId, dataView, columns, options);

		dataView.onRowCountChanged.subscribe(function (e, args) {
			grid.updateRowCount();
			grid.render();
		});

		dataView.onRowsChanged.subscribe(function (e, args) {
			grid.invalidateRows(args.rows);
			grid.render();
		});

		grid.onSort.subscribe(function(e, args) {
			var comparer = function(a, b) {
				if($.isNumeric(a[args.sortCol.field])) {
					return (parseFloat(a[args.sortCol.field]) > parseFloat(b[args.sortCol.field])) ? 1 : -1;
				}else {
					return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
				}	

			}
			dataView.sort(comparer, args.sortAsc);
		});
		
		
		grid.onClick.subscribe(function(e, args) {
			//var cell = grid.getCellFromEvent(e);
			//var row = cell.row;
			//var col = cell.cell;

		});

		grid.onDblClick.subscribe(function(e, args) {
			//var cell = grid.getCellFromEvent(e);
			//var row = cell.row;
			//var col = cell.cell;
			e.stopPropagation();
			e.preventDefault();
			
		});

		grid.onCellChange.subscribe(function(e, arg) {
			//var row = arg.row;
			//var item = grid.getData().getItem(row);
		});

		grid.onValidationError.subscribe(function(e, args) {//$('#log').html(JSON.stringify(e.data));
			
			var validationResult = args.validationResults;
			var activeCellNode = args.cellNode;
			var editor = args.editor;
			var errorMessage = validationResult.msg;
			var valid_result = validationResult.valid;
			if (!valid_result) {
				
				var html = "";
				html = html + "<div class=\"modal\" id=\"slick_valid_msg\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"> ";
				html = html + "		<div class=\"modal-dialog\"> ";
				html = html + "			<div class=\"modal-content\" style=\"margin-top:300px;\"> ";
				html = html + "				<div class=\"modal-body\" style=\"text-align:center;\"> ";
				html = html + "               <p>"+errorMessage+"</p> ";
				html = html + "				</div> ";
				html = html + "			</div> ";
				html = html + "		</div>";
				html = html + "	</div>";

				$(html).appendTo(document.body); 
				$('#slick_valid_msg').modal({
					show:true
				});	
				
				setTimeout(function(){
					$('#slick_valid_msg').modal('hide');
					$('#slick_valid_msg').remove();
					validationResult.input.focus();
					validationResult.input.select(); 
				},1000);
				
			}
		});


		if(!this.isMobile()) {
			grid.setSelectionModel(new Slick.CellSelectionModel({selectActiveCell: false,use_checkbox:checkbox}));
			
			//if(excel_paste) {
				grid.getCanvasNode().focus();
				grid.registerPlugin(new Slick.CellExternalCopyManager({}));
			//}
			//grid.registerPlugin(new Slick.AutoTooltips());
			//grid.registerPlugin( new Slick.AutoTooltips({ enableForHeaderCells: true }) );
		}else {
			grid.setSelectionModel(new Slick.RowSelectionModel());
		}	
		
		if(checkbox) {
			grid.registerPlugin(checkboxSelector); 
		}
	};

	this.dataLoad = function(option) {
		dataLoadOption = option;
		var msgId = option.msgId;
		var url = option.url;
		var data = option.data;
		var loading = option.loading;

		if(typeof data == "undefined" || data == null) {
			var searchForm = option.searchForm;
			var disableSelect = searchForm.find(':disabled').removeAttr('disabled');
			data = searchForm.serialize();
		}

		if(typeof loading != "undefined"){
			showLoading();
		}

		this.dataLoadInit();

		_cmn.ajax.exec({
			url:url,
			data: data,
			success : function(data){
				if(msgId) {
					$('#'+msgId).html(data.result.length + " 건의 데이터가 검색되었습니다");
				}
				scope.setGridData(data.result);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$('#log').html(xhr.responseText);
			},
			complete: function (jqXHR,textStatus ) {
				
				if(typeof loading != "undefined"){
					//hideLoading();
					setTimeout(hideLoading,100);
				}
				if(typeof disableSelect != "undefined") {
					disableSelect.attr('disabled','disabled');
				}
			}
		});
	};
	
	this.dataLoadInit = function() {
		grid.setSelectedRows([]);

		commandQueue = [];
		addData = [];
		updateData = [];

		originData = [];
	};

	this.setGridData = function(data) {
		gridData = data;
		dataView.setItems(gridData);
			
		grid.invalidate();                                   
		grid.updateRowCount();
		grid.render();
		
		//깊은 복사로 원본 데이터 저장
		originData = JSON.parse(JSON.stringify(data));
	};

	this.getGridData = function() {
		return grid.getData();
		//return gridData;
	};

	this.queueAndExecuteCommand = function(item, column, editCommand) {
		//originData.push(item);
		
		commandQueue.push(editCommand); //undo 용
		editCommand.execute(); 
		
		for(var i=0;i<updateData.length;i++) {
			if(updateData[i].id == item.id){
				updateData.splice(i,1);
			}
		}
		
		var origin = {};
		for(var i=0;i<originData.length;i++) {
			if(originData[i].id == item.id){
				origin = originData[i];
				break;
			}
		}

		if(!scope.compareObjects(origin,item)) {
			updateData.push(item);	
		} 

		scope.setSelectedRow();
	};
	
	this.setSelectedRow = function() {
		var selectedRow = [];
		for(var i=0;i<gridData.length;i++){
			var data = gridData[i];
			for(var j=0;j<updateData.length;j++){
				if(data.id == updateData[j].id) {
					selectedRow.push(i);
					break;
				}
			}
		}

		grid.setSelectedRows(selectedRow);	
	};

	this.getSelectedRow = function() {
		return grid.getSelectedRows();	
	};

	this.addrow = function() {
		var data = {};
		for(var i=0;i<columns.length;i++){
			data[columns[i].field] =  (typeof columns[i].default_value != "undefined") ? columns[i].default_value : "";
		}

		//generateUUID 모바일 chrome에서 안 먹힘, id값 생성을 타임값으로 함..유일값 보장은 못하지만 특별한 사정이 없으면 ID로 사용 가능할 듯
		//data['id'] = this.generateUUID()
		//data['id'] = addData.length + new Date().getTime();
		var date = new Date();
		data['id'] = addData.length+1 + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds();
		data['idx'] = '0';
		
		gridData.splice( 0, 0, data );

		dataView.setItems(gridData);
			
		grid.invalidate();                                   
		grid.updateRowCount();
		grid.render();

		addData.push(data);
		updateData.push(data);
		
		scope.setSelectedRow();

	};
	
	this.generateUUID = function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};
	
	this.cancelrow = function() {
		if(addData.length >0) {
			var data = addData[0];
			for(var i=0;i<updateData.length;i++){
				if(data.id == updateData[i].id) {
					updateData.splice(i,1);
					break;
				}
			}
			
			for(var i=0;i<gridData.length;i++){
				if(data.id == gridData[i].id) {
					gridData.splice(i,1);
					break;
				}
			}
			
			addData.splice(0,1);
			
			dataView.setItems(gridData);
			
			grid.invalidate();                                   
			grid.updateRowCount();
			grid.render();
			
			scope.setSelectedRow();

		}
	};

	this.saverow = function(option) {

		var edit_complete_btn = $('<button id="btn_edit" style="display:none;" onclick="gridObj.gridInfo().grid.setOptions({autoEdit:true})">Auto-edit ON</button>');
		$('body').append(edit_complete_btn);

		edit_complete_btn.click();
		edit_complete_btn.remove();

		if(updateData.length == 0) {
			alert("저장할 데이터가 없습니다.");
			return false;
		}

		for(var i=0;i<updateData.length;i++){
			var update = updateData[i]; 
			
			for(var j=0;j<columns.length;j++){
				var column = columns[j];
				var result = slickgrid_cell_validate(column.id,update[column.id],null);

				if( !result.valid ) {
					//alert(result.msg);
					var html = "";
					html = html + "<div class=\"modal\" id=\"slick_valid_msg\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"> ";
					html = html + "		<div class=\"modal-dialog\"> ";
					html = html + "			<div class=\"modal-content\" style=\"margin-top:300px;\"> ";
					html = html + "				<div class=\"modal-body\" style=\"text-align:center;\"> ";
					html = html + "               <p>"+result.msg+"</p> ";
					html = html + "				</div> ";
					html = html + "			</div> ";
					html = html + "		</div>";
					html = html + "	</div>";

					$(html).appendTo(document.body); 
					$('#slick_valid_msg').modal({
						show:true
					});	
					
					setTimeout(function(){
						$('#slick_valid_msg').modal('hide');
						$('#slick_valid_msg').remove();
					},1000);

					return false;
				}

			}
		}

		//alert(JSON.stringify(updateData));return false;
		var url = option.url;
		//var data = {saveDatas:JSON.stringify(updateData)};
		var data = {};
		data.saveDatas = JSON.stringify(updateData);
		data.optionDatas = JSON.stringify(option.optionDatas);

		showLoading();
		_cmn.ajax.exec({
			method : 'post',
			type : 'post',
			url:url,
			dataType : 'json',
			data: data,
			success : function(data){
				//option.btn.click();
				scope.dataLoad(dataLoadOption);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				//alert("error ::  \n\r" + xhr.responseText);
				$('#log').html(xhr.responseText);
			},
			complete: function (jqXHR,textStatus ) {
				hideLoading();
				if(typeof disableSelect != "undefined") {
					disableSelect.attr('disabled','disabled');
				}
			}
		});

	};

	this.excel_downlaod = function(option) {
		var excel_name = option.excel_name;
		var column = option.column;
		var excel_data = option.excel_data;
		
		if(typeof column == "undefined" || column == null) {
			column = columns;
		}

		if(typeof excel_data == "undefined" || excel_data == null) {
			excel_data = gridData;
		}

		column = JSON.stringify(column);
		excel_data = JSON.stringify(excel_data);

		$form = $('<form/>').attr({"id":"excel_down_form","name":"excel_down_form","action":"/common/excel_down","method":"post"});
				$('<input/>').attr({"type":"hidden","name":"excel_name"}).val(excel_name).appendTo($form);
				$('<input/>').attr({"type":"hidden","name":"column"}).val(column).appendTo($form);
				$('<input/>').attr({"type":"hidden","name":"excel_data"}).val(excel_data).appendTo($form);
				// $('<input/>').attr({"type":"hidden","name":$('#csrf_token').attr('name')}).val($('#csrf_token').val()).appendTo($form);

		$('body').append($form);

		$form.submit();
		$form.remove();

		// var url = "/common/excel_down";
		// var data = {};
		// data.excel_name = excel_name;
		// data.column = column;
		// data.excel_data = excel_data;
		// data[$('#csrf_token').attr('name')] = $('#csrf_token').val();

		// data = $form.serialize();

		// $.ajax({
		// 	method : 'post',
		// 	type : 'post',
		// 	url:url,
		// 	dataType : 'json',
		// 	data: data,
		// 	success : function(data){
		// 		console.log(data);
		// 		if($('#csef_token').length > 0){
		// 			$('#csrf_token').val(data.token);
		// 		}
		// 	},
		// 	error: function (xhr, ajaxOptions, thrownError) {

		// 		$('#log').html(xhr.responseText);
		// 	},
		// 	complete: function (jqXHR,textStatus ) {
				
		// 		if(typeof loading != "undefined"){
		// 			//hideLoading();
		// 			setTimeout(hideLoading,100);
		// 		}
		// 		if(typeof disableSelect != "undefined") {
		// 			disableSelect.attr('disabled','disabled');
		// 		}

		// 	}
		// });
	}

	this.compareObjects = function (o1, o2){
		for(var p in o1){
			if(o1.hasOwnProperty(p)){
				if(o1[p] !== o2[p]){
					return false;
				}
			}
		}
		for(var p in o2){
			if(o2.hasOwnProperty(p)){
				if(o1[p] !== o2[p]){
					return false;
				}
			}
		}
		return true;
	};

	this.isMobile = function() {
		var filter = "win16|win32|win64|mac";
		if(navigator.platform){
			if(0 > filter.indexOf(navigator.platform.toLowerCase())){
				return true;
			}else{
				return false;
			}
		}
	};

	this.gridInfo = function() {
		return {
			grid:grid
		};
	};

	this.init();
}

function IdxFormatter(row, cell, value, columnDef, dataContext) { 
	if(value == "0"){
		return "";
	}else {
		return value;
	}
}

function PriceFormatter(row, cell, value, columnDef, dataContext) {
	return fn_addComma(value);
}

//function undo() { 
//	var command = commandQueue.pop(); 
//	if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) { 
//		command.undo(); 
//		grid.gotoCell(command.row, command.cell, false); 
//	} 
//} 


/*
var undoRedoBuffer = {
	commandQueue : [],
	commandCtr : 0,

	queueAndExecuteCommand : function(editCommand) {
		this.commandQueue[this.commandCtr] = editCommand;
		this.commandCtr++;
		editCommand.execute();
	},

	undo : function() {
		if (this.commandCtr == 0)
		 return;

		this.commandCtr--;
		var command = this.commandQueue[this.commandCtr];

		if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
			command.undo();
		}
	},
	redo : function() {
		if (this.commandCtr >= this.commandQueue.length)
			return;
		var command = this.commandQueue[this.commandCtr];
		this.commandCtr++;
		if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
			command.execute();
		}
	}
};

var pluginOptions = {
	clipboardCommandHandler: function(editCommand){ undoRedoBuffer.queueAndExecuteCommand.call(undoRedoBuffer,editCommand); },
	includeHeaderWhenCopying : false
};
*/
