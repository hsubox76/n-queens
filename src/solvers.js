/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  for (var i = 0; i < n; i++) {
    solution.togglePiece(i,i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var addRook = function (row, n) {
    var currentPlacement;
    var successes = 0;
    for (var col = 0; col < n; col++) {
      if (!(col in blockedCols)) {
        solMatrix[row][col] = 1;
        currentPlacement = [row, col];
        blockedCols[col] = true;
        if ( row === n -1 ) {
          successes = 1;
        }
        else {
          successes = successes + addRook(row + 1, n);
        }
        solMatrix[currentPlacement[0], currentPlacement[1]] = 0;
        delete blockedCols[col];
      }
    }
    return successes;
  }

  var solMatrix = _.range(n).map(function() {
      return _.range(n).map(function() {
        return 0;
      });
  });

  var blockedCols = {};

  var solutionCount = addRook(0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }

  var blockedCols = {};

  var solutionBoard = new Board({n: n});

  var addQueen = function (row, n) {
    var currentPlacement;
    for (var col = 0; col < n; col++) {

      if (!(col in blockedCols)) {
        solutionBoard.togglePiece(row, col);
        currentPlacement = [row, col];
        blockedCols[col] = true;

        if (!solutionBoard.hasAnyBishopConflictsOn(row, col)) {
          if (row === n-1) {
            return solutionBoard.rows();
          } else {
            var result = addQueen(row+1, n);
            if (result) {
              return result;
            }
          }
        }

        solutionBoard.togglePiece(row, col);
        delete blockedCols[col];
      }
      
    }

    if (row === 0) {
      return solutionBoard.rows();
    }
  };

  return addQueen(0, n);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }

  var blockedCols = {};

  var solutionBoard = new Board({n: n});

  var addQueen = function (row, n) {
    var currentPlacement;
    for (var col = 0; col < n; col++) {

      if (!(col in blockedCols)) {
        solutionBoard.togglePiece(row, col);
        currentPlacement = [row, col];
        blockedCols[col] = true;

        if (!solutionBoard.hasAnyBishopConflictsOn(row, col)) {
          if (row === n-1) {
            return solutionBoard.rows();
          } else {
            var result = addQueen(row+1, n);
            if (result) {
              return result;
            }
          }
        }

        solutionBoard.togglePiece(row, col);
        delete blockedCols[col];
      }
      
    }

    if (row === 0) {
      return solutionBoard.rows();
    }
  };

  return addQueen(0, n);
};
