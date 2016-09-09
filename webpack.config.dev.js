/**
 * Created by Vladimir on 9/10/2016.
 */
module.exports = {
	debug: true,
	devtool: "source-map",//"cheap-module-eval-source-map",
	entry:  __dirname + "/app/main.js",
	output: {
		path: __dirname + "/build",
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /(\.css)$/, loaders: ['style', 'css']
			}
		]
	}
};