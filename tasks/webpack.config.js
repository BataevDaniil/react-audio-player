const webpack = require('webpack');
const mode = require('./mode');

let config = {
	mode,
	output: {
		publicPath: '/js/'
	},
	watch: true,
	// devtool: 'source-map',
	devtool: 'eval',
	watchOptions: {
		aggregateTimeout: 100,
		poll: 100
	},
	resolve: {
		modules: ['./node_modules'],
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css']
	},
	resolveLoader: {
		modules: ['./node_modules'],
		moduleExtensions: ['-loader'],
		extensions: ['.js']
	},
	module: {
		rules: [{
				// regex js or jsx
				test: /\.jsx?$/i,
				exclude:/(node_modules|bower_components)/,
				use: [
					'babel',
					'ify'
				]
			}, {
				test: /\.css$/i,
				use: [
					'style',
					'css'
				]
			}, {
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: ['url']
			}
		]

	},
	plugins: [
	]
};

module.exports = config;
