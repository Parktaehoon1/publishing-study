(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "CellSelectionModel": CellSelectionModel
    }
  });


  function CellSelectionModel(options) {
    var _grid;
    var _canvas;
    var _ranges = [];
    var _self = this;
    var _selector = new Slick.CellRangeSelector({
      "selectionCss": {
        "border": "2px solid black"
      }
    });
    var _options;
    var _defaults = {
      selectActiveCell: true
    };


    function init(grid) {
      _options = $.extend(true, {}, _defaults, options);
      _grid = grid;
      _canvas = _grid.getCanvasNode();
      _grid.onActiveCellChanged.subscribe(handleActiveCellChange);
      _grid.onKeyDown.subscribe(handleKeyDown);
      _grid.onDblClick.subscribe(handleClick);
	  grid.registerPlugin(_selector);
      _selector.onCellRangeSelected.subscribe(handleCellRangeSelected);
	  _selector.onBeforeCellRangeSelected.subscribe(handleBeforeCellRangeSelected);
    }

    function destroy() {
      _grid.onActiveCellChanged.unsubscribe(handleActiveCellChange);
      _grid.onKeyDown.unsubscribe(handleKeyDown);
      _selector.onCellRangeSelected.unsubscribe(handleCellRangeSelected);
      _selector.onBeforeCellRangeSelected.unsubscribe(handleBeforeCellRangeSelected);
      _grid.unregisterPlugin(_selector);
    }

    function removeInvalidRanges(ranges) {
      var result = [];

      for (var i = 0; i < ranges.length; i++) {
        var r = ranges[i];
        if (_grid.canCellBeSelected(r.fromRow, r.fromCell) && _grid.canCellBeSelected(r.toRow, r.toCell)) {
          result.push(r);
        }
      }

      return result;
    }

    function setSelectedRanges(ranges) {
      _ranges = removeInvalidRanges(ranges);
      _self.onSelectedRangesChanged.notify(_ranges);
    }

    function getSelectedRanges() {
      return _ranges;
    }

    function handleBeforeCellRangeSelected(e, args) {
      if (_grid.getEditorLock().isActive()) {
        e.stopPropagation();
        return false;
      }
    }

    function handleCellRangeSelected(e, args) {//alert(args.range);
      setSelectedRanges([args.range]);
    }
	
	/*selectActiveCell : false 인 경우 1개의 셀을 클릭하는 경우 복사가 안되서 추가함
	  쩝 이거 잘안되네잉
	*/
	function handleClick(e, args) {
		
		if (args.row != null && args.cell != null) {
			if(typeof use_checkbox !="undefined") {
				if(args.cell != 0){
					setSelectedRanges([new Slick.Range(args.row, args.cell)]);
				}
			}else {
				setSelectedRanges([new Slick.Range(args.row, args.cell)]);	
			}
		}
		
	}	

    function handleActiveCellChange(e, args) {//alert(args.row + "  " + args.cell);
      
	  if (_options.selectActiveCell && args.row != null && args.cell != null) {
        setSelectedRanges([new Slick.Range(args.row, args.cell)]);
      }
    }
    
    function handleKeyDown(e) {
      /***
       * Кey codes
       * 37 left
       * 38 up
       * 39 right
       * 40 down                     
       */                                         
      var ranges, last;
      var active = _grid.getActiveCell(); 

      if ( active && e.shiftKey && !e.ctrlKey && !e.altKey && 
          (e.which == 37 || e.which == 39 || e.which == 38 || e.which == 40) ) {
      
        ranges = getSelectedRanges();
        if (!ranges.length)
         ranges.push(new Slick.Range(active.row, active.cell));
         
        // keyboard can work with last range only          
        last = ranges.pop();
        
        // can't handle selection out of active cell
        if (!last.contains(active.row, active.cell))
          last = new Slick.Range(active.row, active.cell);
        
        var dRow = last.toRow - last.fromRow,
            dCell = last.toCell - last.fromCell,
            // walking direction
            dirRow = active.row == last.fromRow ? 1 : -1,
            dirCell = active.cell == last.fromCell ? 1 : -1;
                 
        if (e.which == 37) {
          dCell -= dirCell; 
        } else if (e.which == 39) {
          dCell += dirCell ; 
        } else if (e.which == 38) {
          dRow -= dirRow; 
        } else if (e.which == 40) {
          dRow += dirRow; 
        }
        
        // define new selection range 
        var new_last = new Slick.Range(active.row, active.cell, active.row + dirRow*dRow, active.cell + dirCell*dCell);
        if (removeInvalidRanges([new_last]).length) {
          ranges.push(new_last);
          var viewRow = dirRow > 0 ? new_last.toRow : new_last.fromRow;
          var viewCell = dirCell > 0 ? new_last.toCell : new_last.fromCell;
         _grid.scrollRowIntoView(viewRow);
         _grid.scrollCellIntoView(viewRow, viewCell);
        }
        else 
          ranges.push(last);

        setSelectedRanges(ranges);  
       
        e.preventDefault();
        e.stopPropagation();        
      }           
    }

    $.extend(this, {
      "getSelectedRanges": getSelectedRanges,
      "setSelectedRanges": setSelectedRanges,

      "init": init,
      "destroy": destroy,

      "onSelectedRangesChanged": new Slick.Event()
    });
  }
})(jQuery);
