// var myWorker = new Worker("worker.js");

// myWorker.postMessage([1,2]);
// console.log('Message posted to worker');

// myWorker.onmessage = function(e) {
//   console.log(e.data);
//   console.log('Message received from worker');
// }

var n = 14;
var total = 0;
var exitedWorkers = 0;

var receivedSolutionCount = function (e) {
  total += e.data;
  exitedWorkers++;


  // console.log(e.data);
  // console.log('Message received from worker');
  if(exitedWorkers === n) {
    console.log('Total queen solutions in ' + n + ' queens is: ' + total);
  }
};


workers = [];
for(var i = 0; i < n; i++) {
  workers.push(new Worker('worker.js'));
  workers[i].postMessage({startingCol: i, n: n});
  workers[i].onmessage = receivedSolutionCount;
}





