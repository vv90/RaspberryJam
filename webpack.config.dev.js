/**
 * Created by Vladimir on 9/10/2016.
 */
// var webpack = require('webpack');

import webpack from 'webpack';

export default {
	debug: true,
	devtool: "source-map",//"cheap-module-eval-source-map",
	entry: [
		// 'webpack-dev-server/client?http://localhost:8080',
		// 'webpack/hot/only-dev-server',
		__dirname + "/app/main.js"
	],
	output: {
		path: __dirname + "/build",
		publicPath: "/",
		filename: "bundle.js"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'],
					// plugins: ["react-hot-loader/babel"]
				}
			},
			{
				test: /(\.css)$/, loaders: ['style', 'css']
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)(\?[\s\S]+)?$/,
				loader: 'file'
			},
		]
	}
};