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
var startTime;
var numWorkers;
var nextColInQueue = 0;

var processWorkerMessage = function (e) {
  retObj = e.data;
  
  var workerNumber = this._workerPlaceInArray;
  var workerPercent = retObj.percentage;

  var percentString = Math.round(workerPercent) + "%";
  workers[workerNumber].$bar_text.html(percentString);
  var animationSpeed = (n-8)*20 + 20;
  workers[workerNumber].$bar.animate({width: percentString}, animationSpeed);

  if ("total" in retObj) {
    total += retObj.total;
    workers[workerNumber].$text.html('Worker ' + workerNumber + ' found: ' + retObj.total + ' solutions!');
    workers[workerNumber].terminate();
    exitedWorkers++;
  }

  if(exitedWorkers === numWorkers) {
    var endTime = performance.now();
    var totalTime = (endTime - startTime);
    $('h3').html('Results for n = ' + n + ':');
    var $result = $('<div class="result"></div>');
    $result.html("Possible solutions: " + total + "<br>Elapsed time: " + totalTime.toFixed(1) + "ms.");
    $('h3').append($result);
  }
};

var main = function() {
  workers = [];
  n = +$('.n-field').val();
  numWorkers = +$('.numWorkers-field').val();
  total = 0;
  exitedWorkers = 0;
  console.log('test');
  $('h3').html('Results:');
  $('.worker-container').html('');
  for(var i = 0; i < numWorkers; i++) {
    startTime = performance.now();
    workers.push(new Worker('worker.js'));
    workers[i]._workerPlaceInArray = i;
    workers[i].postMessage({startingCol: i, n: n});
    workers[i].onmessage = processWorkerMessage;
    workers[i].$node = $('<div class="worker"></div>');
    workers[i].$text = $('<div class="worker-text">Worker ' + i + ' progress:</div>');
    workers[i].$bar_container = $('<div class="worker-bar-container"></div>');
    workers[i].$bar = $('<span class="worker-bar"></span>');
    workers[i].$bar_text = $('<span class="worker-bar-text"></span>');
    workers[i].$text.html('Worker ' + i + ' progress:');
    $('.worker-container').append(workers[i].$node);
    workers[i].$node.append(workers[i].$text);
    workers[i].$node.append(workers[i].$bar_container);
    workers[i].$bar_container.append(workers[i].$bar);
    workers[i].$bar_container.append(workers[i].$bar_text);
  }
}



$(document).ready( function () {
  $('.button').on('click', main);
});




