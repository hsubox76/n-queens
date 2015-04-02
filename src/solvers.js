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

  // how to copy board
  // var newBoard = new Board(oldBoard(rows()));


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //make two nxn matrix  // solutionBoard and blockedSpaces
  //iterate first row
    //if space not blocked
      //place piece
      //store place piece postion
      //block board
    //check if final piece
      //iterate next row

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
  // _.range(n).map(function() {
  //     return _.range(n).map(function() {
  //       return 0;
  //     });
  // });

  var solutionCount = addRook(0, n);


  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
