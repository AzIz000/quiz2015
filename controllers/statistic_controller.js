var models = require('../models/models.js');


//GET /quizes/statistics
exports.index = function(req, res){
	var numPreg = 0;
	var numComm = 0;
	var medComm = 0;
	var numPregNoComm = 0;
	var numPregComm = 0;

	models.Quiz.count().then(function(count){
		numPreg = count;
	});

	models.Comment.count().then(function(count){
		numComm = count;
		medComm = numComm / numPreg;
	});

	models.Comment.count().then(function(count){
		numPregComm = count;
		numPregNoComm = numPreg - numPregNoComm;
		res.render('statistics/index', {numPreg: numPreg, numComm: numComm, medComm: medComm, numPregComm: numPregComm, numPregNoComm: numPregNoComm, errors: []});
	});
}