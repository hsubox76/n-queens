#n-queens
This is a project I completed as a student at [hackreactor](http://hackreactor.com). My partner for this project was Benjamin Zarzycki.

The assignment was to create a program that could solve the [n-queens problem](http://en.wikipedia.org/wiki/Eight_queens_puzzle) for any given *n* entered by the user.

For a twist on the assignment, we also added the ability to use multiple HTML5 web workers to run different parts of the algorithm simultaneously and save overall processing time (as well as allow the user to continue browsing while the process runs in the background).

We have not implemented all the possible optimizations for the algorithm yet, as you can see if you run *n* webworkers for *n* queens.  The first and last webworker will find the same number of solutions, the second and second-to-last will also match in number of solutions, and so on.

The way we set it up, the job is broken up into *n* tasks, one for each column in the chessboard.  Because the chessboard is symmetrical, after solving for half the columns, you know the solutions for the opposite half are identical, but mirrored.  So you don't need to waste time processing them, you just need to double the number of solutions you've found (or make a trivially more complex calculation for odd numbered boards), and you will have the answer in half the time.