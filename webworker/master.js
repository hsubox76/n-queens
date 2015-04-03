// var myWorker = new Worker("worker.js");

// myWorker.postMessage([1,2]);
// console.log('Message posted to worker');

// myWorker.onmessage = function(e) {
//   console.log(e.data);
//   console.log('Message received from worker');
// }

var workers;
var n;
var total;
var exitedWorkers;

var processWorkerMessage = function (e) {
  retObj = e.data;
  
  var workerNumber = this._workerPlaceInArray;
  var workerPercent = retObj.percentage;

  workers[this._workerPlaceInArray].$node.html('Worker ' + this._workerPlaceInArray + ' progress: ' + Math.round(workerPercent) + '%');

  if ("total" in retObj) {
    total += retObj.total;
    workers[this._workerPlaceInArray].$node.html('Worker ' + this._workerPlaceInArray + ' found: ' + retObj.total + ' solutions!');
    workers[this._workerPlaceInArray].terminate();
    exitedWorkers++;
  }

  if(exitedWorkers === n) {
    var $result = $('<div class="result"></div>');
    $result.html(total);
    $('h3').append($result);
  }
};

var main = function() {
  workers = [];
  n = +$('.n-field').val();
  total = 0;
  exitedWorkers = 0;
  console.log('test');
  $('h3').html('Results:');
  $('.worker-container').html('');
  for(var i = 0; i < n; i++) {
    workers.push(new Worker('worker.js'));
    workers[i]._workerPlaceInArray = i;
    workers[i].postMessage({startingCol: i, n: n});
    workers[i].onmessage = processWorkerMessage;
    workers[i].$node = $('<div class="worker"></div>');
    workers[i].$node.html('Worker ' + i + ' progress:');
    $('.worker-container').append(workers[i].$node);
  }
}



$(document).ready( function () {
  $('.button').on('click', main);
});




