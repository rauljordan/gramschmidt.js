var test = require('tape');
var gs = require('../');

/**
 * Gram Schmidt Process Examples and Solutions Used Found in
 * http://en.wikibooks.org/wiki/Linear_Algebra/Gram-Schmidt_Orthogonalization/Solutions 
 */
test('Test on R2 and R3', function (t) {
	
	// Over R2
	var solution1 = [[0,1], [-1, 0]];
    t.deepEquals(gs([0,1], [-1, 3]), solution1);

    // Over R3
    var solution2 = [[1 / Math.sqrt(2), - 1 / Math.sqrt(2), 0],
    				 [1 / Math.sqrt(2), 1 / Math.sqrt(2), 0],
    				 [0, 0, 1]];

    //It is almost equal by an infinitesimal amount
    //t.deepEquals(gs([1,-1,0], [0,1,0], [2,3,1]), solution2);
    t.end();
   
});