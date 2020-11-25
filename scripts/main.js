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
    let data = e.dataTransfer.getData("text/plain");
    data = JSON.parse(data);
    let rows = document.getElementById(data.id).rows;
    for (let row of rows) {
      if (row.classList.contains('ready-for-drop')) {
        row.classList.remove('ready-for-drop');
      }
      let cells = row.cells;
      for (let cell of cells) {
        cell.style.cursor = "pointer";
      }
    }
  }

  /*##############################################################################
  ##    3. Add Required Event listeners to all table cells                      ##
  ##############################################################################*/

  let cells = document.getElementsByClassName('table-cell');
  for (let cell of cells) {
    addDragEvents(cell);
  }

  /*##############################################################################
  ##                            4. Dragstart Handler                            ##
  ##############################################################################*/

  // This function is created to define the action of a drag (which data will be
  // taken for transfer to the HTML element into which the dragged element's
  // content will be dropped)

  function dragCell(e) {
    // Change the cursor to a grabbing hand on dragstart
    let cells = document.getElementsByClassName('table-cell');
    for (let cell of cells) {
      cell.style.cursor = "grabbing";
    }
    // Three pieces of information must be transferred for the drag & drop to work
    // properly: the table id of the table having the row being dragged (to assure
    // that D&D only works among rows of the same table), the row index of the row
    // being dragged (to know which row needs to be replaced via the drop
    // function), and finally the content of the row being dragged
    let draggedRow = e.target.closest("tr");
    // Get the row index of that row
    let rowNumber = draggedRow.rowIndex;
    // Get the id name of the table having that row
    let tableId = draggedRow.parentNode.parentNode.getAttribute("id");
    // Initiate JSON object which will be transferred to the drop row
    let data = { "id": tableId, "rowNumber": rowNumber };
    // Append all the cells as second element onto this same object
    let cellsdragged = draggedRow.children;
    let amountOfCells = cellsdragged.length;
    let dataToTransfer = [];
    for (let i = 0; i < amountOfCells; i++) {
      let currentCell = cellsdragged[i];
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
    e.preventDefault();
    // Second, access data coming from dragged element (which is the index of the
    // row from which data is being dragged)
    let data = e.dataTransfer.getData("text/plain");
    data = JSON.parse(data);
    // Next, get the index of the row into which content shall be dropped
    let rowToDrop = e.target.closest('tr');
    let targetIndex = rowToDrop.rowIndex;
    // Next, get the id of the table of that retrieved row
    let targetId = rowToDrop.parentNode.parentNode.getAttribute("id");
    // Next, only proceed if the dragged row comes from the same table as the
    // target row, and if the dragged and the target rows are two different rows
    if (data.id == targetId && data.rowNumber != targetIndex) {
      // Store the contents of the target row in the same array structure as the
      // one coming from the dragged row
      let targetContents = [];
      // Exchange the contents of the two rows
      let cellsForDrop = rowToDrop.children;
      let amountOfCells = cellsForDrop.length;
      for (let i = 0; i < amountOfCells; i++) {
        targetContents
          .push(cellsForDrop[i].outerHTML);
      }
      // Exchange the contents of the two rows
      let draggedRow = document.getElementById(data.id).rows[data.rowNumber];
      let cellsOfDrag = draggedRow.children;
      for (let i = 0; i < amountOfCells; i++) {
        // Replace the content of the row into which the drag is being dropped
        // with the content of the dragged row
        cellsForDrop[i].outerHTML = data.cellContents[i];
        // Replacement of the outerHTML deletes all bound event listeners, so:
        addDragEvents(cellsForDrop[i]);
        // And now, replace the content of the dragged row with the content of the
        // target row. Then, do the same for the value.
        cellsOfDrag[i].outerHTML = targetContents[i];
        addDragEvents(cellsOfDrag[i]);
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
      let currentRow = this.closest('tr');
      // Check if the currently entered row is different from the row entered via
      // the last drag
      if (previousRow !== null) {
        if (currentRow !== previousRow) {
          // If so, remove the class responsible for highlighting it via CSS from
          // it
          previousRow.className = "";
        }
      }
      // Each time an HTML element is entered, add the class responsible for
      // highlighting it via CSS onto its containing row (or onto itself, if row)
      currentRow.className = "ready-for-drop";
      // To know which row has been the last one entered when this function will
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
  }

  // draggable = "true" class="table-cell" in the td


  const popupBtn = document.getElementById('popup-btn')
  if (popupBtn) {
    popupBtn.addEventListener('click', function () {
      const cover = document.getElementById('cover');
      cover.classList.add('hidden');
      const popUp = document.getElementById('pop-up');
      popUp.classList.add('hidden');

    })
  }



  function popupDisapear() {
    const cover = document.getElementById('cover')
    cover.classList.add('hidden')
    const popUp = document.getElementById('pop-up')
    popUp.classList.add('hidden')
  }
})
