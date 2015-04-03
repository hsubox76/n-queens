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

  var solutionBoard = new Board({n: n});
  var blockedCols = {};

  var addRook = function (row, n) {
    var currentPlacement;
    var successes = 0;
    for (var col = 0; col < n; col++) {
      if (!(col in blockedCols)) {
        solutionBoard.togglePiece(row, col);
        currentPlacement = [row, col];
        blockedCols[col] = true;
        if ( row === n -1 ) {
          successes = 1;
        }
        else {
          successes = successes + addRook(row + 1, n);
        }
        solutionBoard.togglePiece(row, col);
        delete blockedCols[col];
      }
    }
    return successes;
  }

  var solutionCount = addRook(0, n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0 && n === 1) {
    return 0;
  }

  var blockedCols = {};

  var solutionBoard = new Board({n: n});

  var addQueen = function (row, n) {
    var currentPlacement;
    var successes = 0;
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
    return 1;
  }

  var blockedCols = {};


  
  // var array of queen positions (row, col)
    // array[0] = 00010000
    // array[1] = 00000100
  // var qpr0 = queen position row 0
  // find mask
    // colMask = array[0] | array[1] | array[...]
      // 00010100
    // diagonal mask
      // (array[i] << current row) | (array[i] >> current row)
        // diagMask = 0;
        // diagMask = diagMask | (array[0] << 7) | (array[0] >> 7)
        // diagMask = diagMask | (array[1] << 6) | (array[1] >> 6)
          // 00100000 | 00001000
            // 00101000
    // colMask | diagMask
      // 00111100
    // attemptedQueenPlacement = 1;
    // if(!(attemptedQueenPlacement & totalMask))
      //valid placement!
      //array.push(attemptedQueenPlacement)
      //next row
    // else
      //while attemptedQueenPlacement < 10000000
        //attemptedQueenPlacement << 1
        //test again




  var solutionBoard = new Board({n: n});

  var addQueen = function (row, n) {
    var currentPlacement;
    var successes = 0;
    for (var col = 0; col < n; col++) {

      if (!(col in blockedCols)) {
        solutionBoard.togglePiece(row, col);
        currentPlacement = [row, col];
        blockedCols[col] = true;

        if (!solutionBoard.hasAnyBishopConflictsOn(row, col)) {
          if (row === n-1) {
            successes = 1;
          } else {
            successes = successes + addQueen(row+1, n);
          }
        }

        solutionBoard.togglePiece(row, col);
        delete blockedCols[col];
      }
      
    }
    return successes;
  };

  return addQueen(0, n);
};
