
var math = require('mathjs');
var _ = require('underscore');

module.exports = gs;


function gs() {
	var vectors = Array.prototype.slice.call(arguments);
	var x1 = vectors[0];
	var x2 = vectors[1];
	var orthoVectors = [normalize(x1)];

	orthoVectors.push( normalize(math.subtract( x2, math.multiply( math.dot(x2, orthoVectors[0]), orthoVectors[0] ) ) ) );
	return orthoVectors;

}


/**
 * Normalizes a vector given in as a one dimensional array
 * @param  {Array} vector 
 * @return {Array} returns the normalized vector
 */
function normalize(vector) {

	var length = 0;
	_.each(vector, function(v) {
		length += Math.pow(v, 2);
	});
	length = Math.sqrt(length);

	return math.multiply(1 / length, vector);
}


console.log(gs([1,1], [2,1]));
