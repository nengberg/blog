var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		posts: []
	};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: req.params.post
		}).populate('author categories');

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	// Render the view
	view.render('post');

};