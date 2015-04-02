importScripts('../lib/underscore.js', '../lib/backbone.js');
importScripts('Board.js');

onmessage = function(e) {
  var start = e.data['startingCol'];
  var n = e.data['n'];
  self.solutionBoard = new Board({n: n});
  self.blockedCols = {};

  var count = addQueen(0,n,start);

  //console.log(self.solutionBoard.rows());
  // console.log('Message received from main script');
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  // console.log('Posting message back to main script');
  postMessage(count);
}




function addQueen(row, n, startingCol) {
  var currentPlacement;
  var successes = 0;

  for (var col = startingCol || 0; col < n; col++) {

    if (!(col in self.blockedCols)) {
      self.solutionBoard.togglePiece(row, col);
      currentPlacement = [row, col];
      self.blockedCols[col] = true;

      if (!self.solutionBoard.hasAnyBishopConflictsOn(row, col)) {
        if (row === n-1) {
          successes = 1;
        } else {
          successes = successes + addQueen(row+1, n);
        }
      }

      self.solutionBoard.togglePiece(row, col);
      delete self.blockedCols[col];
    }
    if (startingCol !== undefined) {
      col = n;
    }
  }
  return successes;
};