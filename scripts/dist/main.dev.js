"use strict";

window.addEventListener('load', function () {
  /*##############################################################################
  ##    1. Define Function which adds all the required event listeners          ##
  ##############################################################################*/
  function addDragEvents(element) {
    element.addEventListener("dragstart", dragCell);
    element.addEventListener("dragover", allowDrop);
    element.addEventListener("drop", dropCell);
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragend", handleDragEnd);
  }
  /*##############################################################################
  ##    2. Define Function which resets the drag state for the concerned table  ##
  ##############################################################################*/


  function resetDragState(e) {
    var data = e.dataTransfer.getData("text/plain");
    data = JSON.parse(data);
    var rows = document.getElementById(data.id).rows;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var row = _step.value;

        if (row.classList.contains('ready-for-drop')) {
          row.classList.remove('ready-for-drop');
        }

        var _cells = row.cells;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _cells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var cell = _step2.value;
            cell.style.cursor = "pointer";
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  /*##############################################################################
  ##    3. Add Required Event listeners to all table cells                      ##
  ##############################################################################*/


  var cells = document.getElementsByClassName('table-cell');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = cells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var cell = _step3.value;
      addDragEvents(cell);
    }
    /*##############################################################################
    ##                            4. Dragstart Handler                            ##
    ##############################################################################*/
    // This function is created to define the action of a drag (which data will be
    // taken for transfer to the HTML element into which the dragged element's
    // content will be dropped)

  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  function dragCell(e) {
    // Change the cursor to a grabbing hand on dragstart
    var cells = document.getElementsByClassName('table-cell');
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = cells[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var cell = _step4.value;
        cell.style.cursor = "grabbing";
      } // Three pieces of information must be transferred for the drag & drop to work
      // properly: the table id of the table having the row being dragged (to assure
      // that D&D only works among rows of the same table), the row index of the row
      // being dragged (to know which row needs to be replaced via the drop
      // function), and finally the content of the row being dragged

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var draggedRow = e.target.closest("tr"); // Get the row index of that row

    var rowNumber = draggedRow.rowIndex; // Get the id name of the table having that row

    var tableId = draggedRow.parentNode.parentNode.getAttribute("id"); // Initiate JSON object which will be transferred to the drop row

    var data = {
      "id": tableId,
      "rowNumber": rowNumber
    }; // Append all the cells as second element onto this same object

    var cellsdragged = draggedRow.children;
    var amountOfCells = cellsdragged.length;
    var dataToTransfer = [];

    for (var i = 0; i < amountOfCells; i++) {
      var currentCell = cellsdragged[i];
      dataToTransfer.push(currentCell.outerHTML);
    }

    data["cellContents"] = dataToTransfer;
    data = JSON.stringify(data);
    e.dataTransfer.setData("text/plain", data);
  }
  /*##############################################################################
  ##                             5. Dragover Handler                            ##
  ##############################################################################*/
  // This function is used to allow for drops into the corresponding HTML elements
  // (the default behavior doesn't allow this)


  function allowDrop(e) {
    e.preventDefault();
  }
  /*##############################################################################
  ##                               6. Drop Handler                              ##
  ##############################################################################*/


  function dropCell(e) {
    // First, prevent default behavior once again
    e.preventDefault(); // Second, access data coming from dragged element (which is the index of the
    // row from which data is being dragged)

    var data = e.dataTransfer.getData("text/plain");
    data = JSON.parse(data); // Next, get the index of the row into which content shall be dropped

    var rowToDrop = e.target.closest('tr');
    var targetIndex = rowToDrop.rowIndex; // Next, get the id of the table of that retrieved row

    var targetId = rowToDrop.parentNode.parentNode.getAttribute("id"); // Next, only proceed if the dragged row comes from the same table as the
    // target row, and if the dragged and the target rows are two different rows

    if (data.id == targetId && data.rowNumber != targetIndex) {
      // Store the contents of the target row in the same array structure as the
      // one coming from the dragged row
      var targetContents = []; // Exchange the contents of the two rows

      var cellsForDrop = rowToDrop.children;
      var amountOfCells = cellsForDrop.length;

      for (var i = 0; i < amountOfCells; i++) {
        targetContents.push(cellsForDrop[i].outerHTML);
      } // Exchange the contents of the two rows


      var draggedRow = document.getElementById(data.id).rows[data.rowNumber];
      var cellsOfDrag = draggedRow.children;

      for (var _i = 0; _i < amountOfCells; _i++) {
        // Replace the content of the row into which the drag is being dropped
        // with the content of the dragged row
        cellsForDrop[_i].outerHTML = data.cellContents[_i]; // Replacement of the outerHTML deletes all bound event listeners, so:

        addDragEvents(cellsForDrop[_i]); // And now, replace the content of the dragged row with the content of the
        // target row. Then, do the same for the value.

        cellsOfDrag[_i].outerHTML = targetContents[_i];
        addDragEvents(cellsOfDrag[_i]);
      }

      resetDragState(e);
    }
  }
  /*##############################################################################
  ##                             7. Dragenter Handler                           ##
  ##############################################################################*/
  // When dragging over the text node of a table cell (the text in a table cell),
  // while previously being over the table cell element, the dragleave event gets
  // fired, which stops the highlighting of the currently dragged cell. To avoid
  // this problem and any coding around to fight it, everything has been
  // programmed with the dragenter event handler only; no more dragleave needed
  // For the dragenter event, e.target corresponds to the element into which the
  // drag enters. This fact has been used to program the code as follows:


  var previousRow = null;

  function handleDragEnter(e) {
    // Assure that dragenter code is only executed when entering an element (and
    // for example not when entering a text node)
    if (e.target.nodeType === 1) {
      // Get the currently entered row
      var currentRow = this.closest('tr'); // Check if the currently entered row is different from the row entered via
      // the last drag

      if (previousRow !== null) {
        if (currentRow !== previousRow) {
          // If so, remove the class responsible for highlighting it via CSS from
          // it
          previousRow.className = "";
        }
      } // Each time an HTML element is entered, add the class responsible for
      // highlighting it via CSS onto its containing row (or onto itself, if row)


      currentRow.className = "ready-for-drop"; // To know which row has been the last one entered when this function will
      // be called again, assign the previousRow variable of the global scope onto
      // the currentRow from this function run

      previousRow = currentRow;
    }
  }
  /*##############################################################################
  ##                              8. Dragend Handler                            ##
  ##############################################################################*/
  // This function is required for cases where the dragged has been dropped on a
  // non-valid drop target.


  function handleDragEnd(e) {
    resetDragState(e);
  } // draggable = "true" class="table-cell" in the td


  var popupBtn = document.getElementById('popup-btn');

  if (popupBtn) {
    popupBtn.addEventListener('click', function () {
      var cover = document.getElementById('cover');
      cover.classList.add('hidden');
      var popUp = document.getElementById('pop-up');
      popUp.classList.add('hidden');
    });
  }

  function popupDisapear() {
    var cover = document.getElementById('cover');
    cover.classList.add('hidden');
    var popUp = document.getElementById('pop-up');
    popUp.classList.add('hidden');
  }
});