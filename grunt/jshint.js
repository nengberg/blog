module.exports = {
	options: {
		reporter: require('jshint-stylish'),
		force: true
	},
	all: [ 'routes/**/*.js',
	'models/**/*.js',
	'public/js/main.js'

	],
	server: [
		'./keystone.js'
	]
}
