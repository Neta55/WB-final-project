"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var todotable = document.getElementById('todotable');
  var draggingEle;
  var draggingRowIndex;
  var placeholder;
  var list;
  var isDraggingStarted = false; // peles sākotnējā atrašanās vieta virs draging elementa

  var x = 0;
  var y = 0; // apaina divas Nodes

  var swap = function swap(nodeA, nodeB) {
    var parentA = nodeA.parentNode;
    var siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling; // Pārvieto `nodeA` pirms `nodeB`

    nodeB.parentNode.insertBefore(nodeA, nodeB); // Pārvieto `nodeB` pirms `nodeA` brāļa

    parentA.insertBefore(nodeB, siblingA);
  }; // lai pārbaudītu vai `nodeA` ir virs `nodeB`


  var isAbove = function isAbove(nodeA, nodeB) {
    // iegūst Nodes ierobežojošo laukumu 
    var rectA = nodeA.getBoundingClientRect();
    var rectB = nodeB.getBoundingClientRect();
    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  var clonetodotable = function clonetodotable() {
    var rect = todotable.getBoundingClientRect();
    var width = parseInt(window.getComputedStyle(todotable).width);
    list = document.createElement('div');
    list.classList.add('clone-list');
    list.style.position = 'absolute';
    list.style.left = "".concat(rect.left, "px");
    list.style.top = "".concat(rect.top, "px");
    todotable.parentNode.insertBefore(list, todotable); // paslēpj īsto tabula

    todotable.style.visibility = 'hidden'; // sāk būvēt jaunu sašķeļamu tabulu

    todotable.querySelectorAll('tr').forEach(function (row) {
      // uztaisa divu
      var item = document.createElement('div'); // pieliek stilu

      item.classList.add('draggable'); // būvē jaunu tabulu

      var newtodotable = document.createElement('todotable');
      newtodotable.setAttribute('class', 'clone-todotable');
      newtodotable.style.width = "".concat(width, "px"); // būvē jaunas rindas

      var newRow = document.createElement('tr');
      var cells = [].slice.call(row.children); // būvē un pieliek jaunas rūtis

      cells.forEach(function (cell) {
        var newCell = cell.cloneNode(true);
        newCell.style.width = "".concat(parseInt(window.getComputedStyle(cell).width), "px");
        newRow.appendChild(newCell);
      }); // pieliek jaunas rindas, 51 divā ieliek tabulu, jaunajai pamatnei list pievieno jaunizveidoto tabulu

      newtodotable.appendChild(newRow);
      item.appendChild(newtodotable);
      list.appendChild(item);
    });
  };

  var mouseDownHandler = function mouseDownHandler(e) {
    // iegūst oriģinālo rindu ko pārvilkt, ko paņem, piespiežot peli
    var originalRow = e.target.parentNode;
    draggingRowIndex = [].slice.call(todotable.querySelectorAll('tr')).indexOf(originalRow); // Nosaka peles pozīciju

    x = e.clientX;
    y = e.clientY; // pievieno jaunus listenerus

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function mouseMoveHandler(e) {
    if (!isDraggingStarted) {
      isDraggingStarted = true; // ja piespiež peli, apakšā īstā tabula nomainās ar jauno

      clonetodotable(); // noteikt pārvietojamās rindas platumu

      var width = parseInt(window.getComputedStyle(todotable).width);
      draggingEle = [].slice.call(list.children)[draggingRowIndex];
      draggingEle.classList.add('dragging'); // pieliek platumu

      draggingEle.style.width = "".concat(width, "px"); // apakšējais vietas placis iegūst pārvelkamās rindas izmērus

      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
      placeholder.style.height = "".concat(draggingEle.offsetHeight, "px");
    } // iestata pārvelkamās rindas pozīcijas


    draggingEle.style.position = 'absolute';
    draggingEle.style.top = "".concat(draggingEle.offsetTop + e.clientY - y, "px");
    draggingEle.style.left = "".concat(draggingEle.offsetLeft + e.clientX - x, "px"); // atjauno peles stāvokli

    x = e.clientX;
    y = e.clientY; // epriekšējā un nākamā rinda zem pārvietojamās

    var prevEle = draggingEle.previousElementSibling;
    var nextEle = placeholder.nextElementSibling; // pārvietojamā rinda atrodas virs iepriekšējā elementa
    // pārvieto rindu uz augšu

    if (prevEle && isAbove(draggingEle, prevEle)) {
      // pārslēdzas:
      // tekošais kārtas numurs    -> jaunscdilstošs kārtas numurs
      // iepriekšējā rinda         -> apakšējais vietas placis
      // pārvietojamā rinda        -> pārvietojamā rinda
      // apakšējais vietas placis  -> iepriekšējā rinda
      swap(placeholder, draggingEle);
      swap(placeholder, prevEle);
      return;
    } // pārvietojamā rinda atrodas zem nākošās elementa
    // pārvieto rindu uz leju


    if (nextEle && isAbove(nextEle, draggingEle)) {
      // pārslēdzas:
      // tekošais kārtas numurs    -> jauns pieaugošs kārtas numurs
      // pārvietojamā rinda        -> nextEle
      // apakšējais vietas placis  -> apakšējais vietas placis
      // nākošā rinda              -> pārvietojamā rinda
      swap(nextEle, placeholder);
      swap(nextEle, draggingEle);
    }
  }; // atlaižot peli


  var mouseUpHandler = function mouseUpHandler() {
    // aizvāc apakšējo vietas placi
    placeholder && placeholder.parentNode.removeChild(placeholder);

    if (draggingEle.classList.contains('dragging')) {
      draggingEle.classList.remove('dragging');
    }

    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position'); // iegūst pārvietojamās rindas jauno [indeksu]

    var endRowIndex = [].slice.call(list.children).indexOf(draggingEle);
    isDraggingStarted = false; // novāc divu

    list.parentNode.removeChild(list); // pārvieto rindu uz jaunā [indeksa] vietu, piešķirot tos arī pārējām skartajām rindām 

    var rows = [].slice.call(todotable.querySelectorAll('tr'));
    draggingRowIndex > endRowIndex ? rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex]) : rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex].nextSibling); // iegūst atpakaļ što tabulu

    todotable.style.removeProperty('visibility'); // novāc peles piespiešanas un atlaišanas listenerus

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    getOrderTask();
  }; // pieliek peles piespiešanas listeneri tabulas pirmajai kolonnai un, pieliekot stilu (user-select: none;), padara tās saturu par lietotāja neietekmējamu


  todotable.querySelectorAll('tr').forEach(function (row, index) {
    var firstCell = row.firstElementChild;
    firstCell.classList.add('draggable');
    firstCell.addEventListener('mousedown', mouseDownHandler);
  });

  var getOrderTask = function getOrderTask(taskId) {
    var allrows = todotable.querySelectorAll('tr');
    var data = [];

    for (var i = 0; i < allrows.length; i++) {
      var _taskId = parseInt(allrows[i].getAttribute("task"));

      data.push({
        task_id: _taskId + 0,
        order_id: i + 1
      });
    }

    var dataList = JSON.stringify(data); // console.log(dataList);

    var xmlHttp = new XMLHttpRequest(data);
    xmlHttp.open("post", '/WB-final-project/controllers/moveController.php');
    xmlHttp.send(dataList);
  };
});