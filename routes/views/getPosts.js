var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var q = keystone.list('Post').paginate({
			page: req.query.page,
			perPage: 1
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author categories');
	
	
	q.exec(function(err, results) {
		res.apiResponse({
			posts: results
		});
	});

};