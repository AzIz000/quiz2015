		var express = require('express');
		var router = express.Router();

		var quizController = require('../controllers/quiz_controller');
		var commentController = require('../controllers/comment_controller');
		var sessionController = require('../controllers/session_controller');
		var statisticController = require('../controllers/statistic_controller');

		/* GET home page. */
		router.get('/', function(req, res) {
		  res.render('index', { title: 'Quiz', errors: [] });
		});

		//AUTOLOAD
		router.param('quizId', quizController.load);
		router.param('commentId', commentController.load);

		//SESSION
		router.get('/login', sessionController.new);
		router.get('/logout', sessionController.destroy);

		router.post('/login', sessionController.create);

		//STATISTICS
		router.get('/quizes/statistics', statisticController.index);

		//QUIZES
		router.get('/quizes', quizController.index);
		router.get('/quizes/new', sessionController.loginRequired, quizController.new);
		router.get('/quizes/:quizId(\\d+)', quizController.show);
		router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
		router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
		

		router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

		router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

		router.post('/quizes/create', sessionController.loginRequired, quizController.create);				

		//COMENTARIOS
		router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', commentController.publish);
		router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);	
		router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

		router.get('/author', function(req, res) {
		  res.render('author', { title: 'Quiz', errors: [] });
		});


		module.exports = router;
