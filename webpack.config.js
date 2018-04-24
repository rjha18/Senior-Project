const path = require('path');

module.exports = {
	entry: './public/src/',
	output: {
		path: path.resolve(__dirname, 'public/build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
                exclude:/(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
			},
		],
	},
	stats: {
		colors: true,
	},
	devtool: 'source-map',
};