importScripts('../lib/underscore.js', '../lib/backbone.js');
importScripts('Board.js');

onmessage = function(e) {
  var start = e.data['startingCol'];
  var n = e.data['n'];
  self.solutionBoard = new Board({n: n});
  self.blockedCols = {};

  addQueen(0,n,start);
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
          if(row === 1) {
            postMessage({percentage: (col+1)/n*100})
          }
        }
      }

      self.solutionBoard.togglePiece(row, col);
      delete self.blockedCols[col];
    }
    if (startingCol !== undefined) {
      col = n;
    }
  }

  if (startingCol !== undefined) {
    postMessage({total: successes, percentage: 100})
  } else {
    return successes;
  }
};