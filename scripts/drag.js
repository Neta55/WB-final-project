document.addEventListener('DOMContentLoaded', function () {
  const todotable = document.getElementById('todotable');

  let draggingEle;
  let draggingRowIndex;
  let placeholder;
  let list;
  let isDraggingStarted = false;

  // peles sākotnējā atrašanās vieta virs draging elementa
  let x = 0;
  let y = 0;

  // apaina divas Nodes
  const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Pārvieto `nodeA` pirms `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Pārvieto `nodeB` pirms `nodeA` brāļa
    parentA.insertBefore(nodeB, siblingA);

  };

  // lai pārbaudītu vai `nodeA` ir virs `nodeB`
  const isAbove = function (nodeA, nodeB) {
    // iegūst Nodes ierobežojošo laukumu 
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
  };

  const clonetodotable = function () {
    const rect = todotable.getBoundingClientRect();
    const width = parseInt(window.getComputedStyle(todotable).width);

    list = document.createElement('div');
    list.classList.add('clone-list');
    list.style.position = 'absolute';
    list.style.left = `${rect.left}px`;
    list.style.top = `${rect.top}px`;
    todotable.parentNode.insertBefore(list, todotable);

    // paslēpj īsto tabula
    todotable.style.visibility = 'hidden';
    // sāk būvēt jaunu sašķeļamu tabulu
    todotable.querySelectorAll('tr').forEach(function (row) {
      // uztaisa divu
      const item = document.createElement('div');
      // pieliek stilu
      item.classList.add('draggable');
      // būvē jaunu tabulu
      const newtodotable = document.createElement('todotable');
      newtodotable.setAttribute('class', 'clone-todotable');
      newtodotable.style.width = `${width}px`;
      // būvē jaunas rindas
      const newRow = document.createElement('tr');
      const cells = [].slice.call(row.children);
      // būvē un pieliek jaunas rūtis
      cells.forEach(function (cell) {
        const newCell = cell.cloneNode(true);
        newCell.style.width = `${parseInt(window.getComputedStyle(cell).width)}px`;
        newRow.appendChild(newCell);
      });
      // pieliek jaunas rindas, 51 divā ieliek tabulu, jaunajai pamatnei list pievieno jaunizveidoto tabulu
      newtodotable.appendChild(newRow);
      item.appendChild(newtodotable);
      list.appendChild(item);
    });
  };

  const mouseDownHandler = function (e) {
    // iegūst oriģinālo rindu ko pārvilkt, ko paņem, piespiežot peli
    const originalRow = e.target.parentNode;
    draggingRowIndex = [].slice.call(todotable.querySelectorAll('tr')).indexOf(originalRow);

    // Nosaka peles pozīciju
    x = e.clientX;
    y = e.clientY;


    // pievieno jaunus listenerus
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    if (!isDraggingStarted) {
      isDraggingStarted = true;
      // ja piespiež peli, apakšā īstā tabula nomainās ar jauno
      clonetodotable();

      // noteikt pārvietojamās rindas platumu
      const width = parseInt(window.getComputedStyle(todotable).width);

      draggingEle = [].slice.call(list.children)[draggingRowIndex];
      draggingEle.classList.add('dragging');
      // pieliek platumu
      draggingEle.style.width = `${width}px`;

      // apakšējais vietas placis iegūst pārvelkamās rindas izmērus
      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
      placeholder.style.height = `${draggingEle.offsetHeight}px`;
    }

    // iestata pārvelkamās rindas pozīcijas
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${draggingEle.offsetTop + e.clientY - y}px`;
    draggingEle.style.left = `${draggingEle.offsetLeft + e.clientX - x}px`;

    // atjauno peles stāvokli
    x = e.clientX;
    y = e.clientY;

    // epriekšējā un nākamā rinda zem pārvietojamās
    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    // pārvietojamā rinda atrodas virs iepriekšējā elementa
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
    }

    // pārvietojamā rinda atrodas zem nākošās elementa
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
  };
  // atlaižot peli
  const mouseUpHandler = function () {
    // aizvāc apakšējo vietas placi
    placeholder && placeholder.parentNode.removeChild(placeholder);
    if (draggingEle.classList.contains('dragging')) {
      draggingEle.classList.remove('dragging');
    }
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    // iegūst pārvietojamās rindas jauno [indeksu]
    const endRowIndex = [].slice.call(list.children).indexOf(draggingEle);

    isDraggingStarted = false;

    // novāc divu
    list.parentNode.removeChild(list);

    // pārvieto rindu uz jaunā [indeksa] vietu, piešķirot tos arī pārējām skartajām rindām 
    let rows = [].slice.call(todotable.querySelectorAll('tr'));
    draggingRowIndex > endRowIndex
      ? rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex])
      : rows[endRowIndex].parentNode.insertBefore(rows[draggingRowIndex], rows[endRowIndex].nextSibling);

    // iegūst atpakaļ što tabulu
    todotable.style.removeProperty('visibility');

    // novāc peles piespiešanas un atlaišanas listenerus
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    getOrderTask();
  };
  // pieliek peles piespiešanas listeneri tabulas pirmajai kolonnai un, pieliekot stilu (user-select: none;), padara tās saturu par lietotāja neietekmējamu
  todotable.querySelectorAll('tr').forEach(function (row, index) {
    const firstCell = row.firstElementChild;
    firstCell.classList.add('draggable');
    firstCell.addEventListener('mousedown', mouseDownHandler);

  });


  const getOrderTask = function (taskId) {
    const allrows = todotable.querySelectorAll('tr');
    const data = [];
    for (var i = 0; i < allrows.length; i++) {
      let taskId = parseInt(allrows[i].getAttribute("task"));
      data.push({ task_id: taskId + 0, order_id: i + 1 });
    }
    const dataList = JSON.stringify(data)

    // console.log(dataList);

    let xmlHttp = new XMLHttpRequest(data);

    xmlHttp.open("post", '/WB-final-project/controllers/moveController.php');
    xmlHttp.send(dataList);



  }



})