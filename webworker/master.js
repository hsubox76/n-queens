var workers; // array holding workers
var n; // n - from user
var numWorkers; // number of workers - from user
var total = 0; // total solutions found
var nextColInQueue = 0; // keep track of next job to be run
var jobsDone = 0; // keep track of how many jobs done
var startTime; // for performance testing

var processWorkerMessage = function (e) {
  retObj = e.data;
  
  var workerNumber = this._workerPlaceInArray;
  var currentWorker = workers[workerNumber];
  var workerPercent = retObj.percentage;

  var percentString = Math.round(workerPercent) + "%";
  currentWorker.$bar_text.html(percentString);
  var animationSpeed = 0;
  currentWorker.$bar.animate({width: percentString}, animationSpeed);

  // if worker is done with current job (starting column)
  if ("total" in retObj) {
    total += retObj.total;
    currentWorker.solutions += retObj.total;
    currentWorker.jobsRun++;
    jobsDone++;
    currentWorker.$text.html('Worker ' + workerNumber + ' ran ' + currentWorker.jobsRun + ' jobs, found ' + currentWorker.solutions + ' solutions!');
    // if another job in the queue
    if (nextColInQueue < n) {
      currentWorker.postMessage({startingCol: nextColInQueue, n: n});
      currentWorker.onmessage = processWorkerMessage;
      nextColInQueue++;
    } else {
      currentWorker.terminate();

    }
  }  if(jobsDone === n) {
    var endTime = performance.now();
    var totalTime = (endTime - startTime);
    $('h3').html('Results for n = ' + n + ':');
    var $result = $('<div class="result"></div>');
    $result.html("Possible solutions: " + total + "<br>Elapsed time: " + totalTime.toFixed(1) + "ms.");
    $('h3').append($result);
  }
};

// Runs when "go" button clicked
var main = function() {
  workers = [];
  // get n from html form
  n = +$('.n-field').val();
  // get number of workers from html form
  numWorkers = +$('.numWorkers-field').val();
  // reset all global vars to 0
  total = 0;
  nextColInQueue = 0;
  jobsDone = 0;
  // reset html
  $('h3').html('Results:');
  $('.worker-container').html('');
  for(var i = 0; i < numWorkers; i++) {
    startTime = performance.now();
    workers.push(new Worker('worker.js'));
    workers[i].solutions = 0;
    workers[i].jobsRun = 0;
    workers[i]._workerPlaceInArray = i;
    workers[i].postMessage({startingCol: nextColInQueue, n: n});
    nextColInQueue++;
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


// Go button event handler
$(document).ready( function () {
  $('.button').on('click', main);
});




