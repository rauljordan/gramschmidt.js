'use strict';

var math = require('mathjs');
var _ = require('underscore');



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

/**
 * Adds up a list of vectors recursively
 * @param  {Array of Arrays} vector list
 * @return {Array} returns of sum of all vectors in arguments
 */
function recursiveVectorSum (vectors) {

	// if length is 1, then return the vector
	if (vectors.length === 1) {
		return vectors.pop()
	}
	else {
		return math.add(vectors.pop(), recursiveVectorSum(vectors));
	}
}

/**
 * Handy helper function for checking if a list of
 * n-dimensional vectors all have equal sizes
 * @param  {Array or Arrays} 
 * @return {Boolean}         
 */
function vectorSizesArentEqual (vectors) {

	for (var i = 0; i < vectors.length; i++) {
		if (i !== 0) {
			if (vectors[i].length !== vectors[i - 1].length) {
				return true;
			}
		}
	}
	return false;
}



/**
 * Implements Gram Schmidt Process given basis vectors in any
 * dimension as arguments
 * @return {Array} returns an array of orthonormalized basis
 * vectors
 */
function gramSchmidt() {

	var vectors = Array.prototype.slice.call(arguments);

	if (vectorSizesArentEqual(vectors)) {
		throw "All Vector Sizes Must Match";
	}

	var orthoVectors = [];

	for (var i = 0; i < vectors.length; i++) {
		if (i === 0) {
			orthoVectors.push(normalize(vectors[0]));
		}
		// subtract it from the sum of all the previous ones which 
		// we will reduce through a loop as a sum! iterates over the orthovectors!
		else {
			var projections = [];

			for (var j = 0; j < orthoVectors.length; j++) {
				var res = math.multiply(math.dot(vectors[i], orthoVectors[j]), orthoVectors[j]);
				projections.push(res);
				//console.log(projections);
			}

			var totalProjection = recursiveVectorSum(projections);

			orthoVectors.push(normalize(math.subtract(vectors[i], totalProjection))); 
		}
	}

	return orthoVectors;
}



module.exports = gramSchmidt;

