/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
	$.extend(true, window, {
	"Slick": {
		"Editors": {
			"Text": TextEditor,
			"Integer": IntegerEditor,
			"Float": FloatEditor, 
			"Date": DateEditor,
			"YesNoSelect": YesNoSelectEditor,
			"Select": SelectEditor,
			"CheckboxMulti": CheckboxMultiEditor,
			"Checkbox": CheckboxEditor,
			"PercentComplete": PercentCompleteEditor,
			"LongText": LongTextEditor
		}
	}
});
  
	function TextEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			 $input = $("<INPUT type=text class='editor-text' />").appendTo(args.container);
			 setTimeout(function(){ $input.focus(); }, 100);
			 
		  /*
		  $input = $("<INPUT type=text class='editor-text' />")
			  .appendTo(args.container)
			  .bind("keydown.nav", function (e) {//alert(e.keyCode);
				if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
				  e.stopImmediatePropagation();
				}
			  })
			  .focus()
			  .select();
		  */
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.getValue = function () {
			return $input.val();
		};

		this.setValue = function (val) {
			$input.val(val);
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field] || "";
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator(args.column.id,$input.val(),$input);
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function IntegerEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text' />").appendTo(args.container);
			setTimeout(function(){ $input.focus(); }, 100);
			/*
			$input = $("<INPUT type=text class='editor-text' />");

			$input.bind("keydown.nav", function (e) {
				if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
				  e.stopImmediatePropagation();
				}
			});

			$input.appendTo(args.container);
			$input.focus().select();
			*/
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return parseInt($input.val(), 10) || 0;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator(args.column.id,$input.val(),$input);
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			if (isNaN($input.val())) {
				return {
					valid: false,
					msg: "Please enter a valid integer"
				};
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function FloatEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text' />");

			$input.bind("keydown.nav", function (e) {
				if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
					e.stopImmediatePropagation();
				}
			});

			$input.appendTo(args.container);
			$input.focus().select();
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return parseFloat($input.val()) || 0;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator(args.column.id,$input.val(),$input);
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			var value = parseFloat($input.val());

			if (isNaN(value)) {
				return {
					valid: false,
					msg: "Please enter a valid float"
				};
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function DateEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;
		var calendarOpen = false;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text' disabled/>");
			$input.appendTo(args.container);
			$input.focus().select();
			$input.datepicker({
				showOn: "button",
				buttonImageOnly: true,
				buttonImage: "images/calendar.gif",
				dateFormat: 'yy-mm-dd',
				firstDay: 0, 
				beforeShow: function () {
					calendarOpen = true
				},
				onClose: function () {
					calendarOpen = false
				}
			});
			$input.width($input.width() - 18);
		};

		this.destroy = function () {
			$.datepicker.dpDiv.stop(true, true);
			$input.datepicker("hide");
			$input.datepicker("destroy");
			$input.remove();
		};

		this.show = function () {
			if (calendarOpen) {
				$.datepicker.dpDiv.stop(true, true).show();
			}
		};

		this.hide = function () {
			if (calendarOpen) {
				$.datepicker.dpDiv.stop(true, true).hide();
			}
		};

		this.position = function (position) {
			if (!calendarOpen) {
				return;
			}
			 $.datepicker.dpDiv
			  .css("top", position.top + 30)
			  .css("left", position.left);
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function YesNoSelectEditor(args) {
		var $select;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			$select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
			$select.select();
		};

		this.serializeValue = function () {
			return ($select.val() == "yes");
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function CheckboxEditor(args) {
		var $select;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			defaultValue = !!item[args.column.field];
			if (defaultValue) {
				$select.prop('checked', true);
			} else {
				$select.prop('checked', false);
			}
		};

		this.serializeValue = function () {
			return $select.prop('checked');
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (this.serializeValue() !== defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function PercentCompleteEditor(args) {
		var $input, $picker;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-percentcomplete' />");
			$input.width($(args.container).innerWidth() - 25);
			$input.appendTo(args.container);

			$picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
			$picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

			$picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

			$input.focus().select();

			$picker.find(".editor-percentcomplete-slider").slider({
				orientation: "vertical",
				range: "min",
				value: defaultValue,
				slide: function (event, ui) {
					$input.val(ui.value)
				}
			});

			$picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
				$input.val($(this).attr("val"));
				$picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
			})
		};

		this.destroy = function () {
			$input.remove();
			$picker.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};

		this.serializeValue = function () {
			return parseInt($input.val(), 10) || 0;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
		};

		this.validate = function () {
			if (isNaN(parseInt($input.val(), 10))) {
				return {
					valid: false,
					msg: "Please enter a valid positive number"
				};
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	  /*
	   * An example of a "detached" editor.
	   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
	   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
	   */
	function LongTextEditor(args) {
		var $input, $wrapper;
		var defaultValue;
		var scope = this;

		this.init = function () {
			var $container = $("body");

			$wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
			  .appendTo($container);

			$input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
			  .appendTo($wrapper);

			$("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
			  .appendTo($wrapper);

			$wrapper.find("button:first").bind("click", this.save);
			$wrapper.find("button:last").bind("click", this.cancel);
			$input.bind("keydown", this.handleKeyDown);

			scope.position(args.position);
			$input.focus().select();
		};

		this.handleKeyDown = function (e) {
			if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
				scope.save();
			} else if (e.which == $.ui.keyCode.ESCAPE) {
				e.preventDefault();
				scope.cancel();
			} else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
				e.preventDefault();
				args.grid.navigatePrev();
			} else if (e.which == $.ui.keyCode.TAB) {
				e.preventDefault();
				args.grid.navigateNext();
			}
		};

		this.save = function () {
			args.commitChanges();
		};

		this.cancel = function () {
			$input.val(defaultValue);
			args.cancelChanges();
		};

		this.hide = function () {
			$wrapper.hide();
		};

		this.show = function () {
			$wrapper.show();
		};

		this.position = function (position) {
			$wrapper
			  .css("top", position.top - 5)
			  .css("left", position.left - 5)
		};

		this.destroy = function () {
			$wrapper.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator(args.column.id,$input.val(),$input);
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}
	  
	function SelectEditor(args) {
		var $select;
		var defaultValue;
		var scope = this;
		var dataSource;
		
		this.init = function() {
			$select = $('<select></select>');
			
			dataSource = args.column.dataSource;	
			$.each(dataSource, function (value, text) {
				newOption = new Option(text, value);
				$select[0].appendChild(newOption);
			});
			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function() {
			$select.remove();
		};

		this.focus = function() {
			$select.focus();
		};

		this.loadValue = function(item) {
			defaultValue = item[args.column.field];
			$select.val(defaultValue);
		};

		this.serializeValue = function() {
			return $select.val();
		};

		this.applyValue = function(item,state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function() {
			return (!($select.val() == "" && defaultValue == null)) && ($select.val() != defaultValue);
		};

		this.validate = function() {
			var valid = true;
			var msg = null;
			if($select.val() == "") {
				valid = false;
				msg = "선택하세요";
			}
			
			return {
				valid: valid,
				msg: msg
			};
		};

		this.init();
	}

	function CheckboxMultiEditor(args) {
		var $html;
		var defaultValue;
		var scope = this;
		var dataSource;
		
		this.init = function() {
			$html = $('<ul style="position:relative;left:0;top:0;width:'+(args.container.clientWidth - 7)+'px;padding:0;margin:0;border:1px solid gray;background-color:#ffffff;"></ul>');
			
			dataSource = args.column.dataSource;	
			$.each(dataSource, function (value, text) {
				var li = $('<li style="list-style:none;padding-left:5px;"><input type="checkbox" id="'+args.column.id+value+'" value="'+text+'"/><label for="'+args.column.id+value+'" style="padding-left:5px;">'+text+'</label></li>');
		
				$html.append(li);
			});

			$html.appendTo(args.container);
			
			/*popup html position 조정*/
			if( (args.gridPosition.bottom - args.position.bottom)  < $html.height() ) {
				var top = $html.height() - (args.gridPosition.bottom - args.position.bottom);
				
				top = "-"+top+"px";//alert(top);

				$html.css({"top" : top});
			}else {
				$html.css({top : "0"});
			}


			$html.focus();
		};

		this.destroy = function() {
			$html.remove();
		};

		this.focus = function() {
			$html.focus();
		};

		this.loadValue = function(item) {
			defaultValue = item[args.column.field];
			if(defaultValue != null) {
				var values = defaultValue.split(',');
				$html.find('input').each(function(index){
					for(var i=0;i<values.length;i++){
						var value = values[i];
						if($(this).val() == value){ 
							$(this).attr('checked', true);
							break;
						}
					}	

				});
			}
			$html.focus();
		};

		this.serializeValue = function() {
			
			var value = "";
			$html.find('input').each(function(index){
				if($(this).is(":checked")){
					value += $(this).val()+",";
				}
			});
			if(value.length > 0) {
				value = value.substr(0,value.length-1);
			}
			
			return value;
		};

		this.applyValue = function(item,state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function() {
			var value = "";
			$html.find('input').each(function(index){
				if($(this).is(":checked")){
					value += $(this).val()+",";
				}
			});
			if(value.length > 0) {
				value = value.substr(0,value.length-1);
			}
				
			if(defaultValue == null) defaultValue = "";

			return (value != defaultValue);
		};

		this.validate = function () {
		  return {
			valid: true,
			msg: null
		  };
		};

		this.init();
	}

})(jQuery);
