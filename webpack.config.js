// 

var Path = require('path')
var Webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')



module.exports = {
	entry: './src/main.js',
	output: {
		path: Path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	// entry: ['./src/main.js'],
	// output: {
	// 	path: './dist',
	// 	filename: '[name].js'
	// },
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue',
			options: {
				// vue-loader options go here
			}
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new Webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new Webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new Webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		// new CopyWebpackPlugin([{
		// 	from: '.',
		// 	to: './dist'
		// }]),
		new PrerenderSpaPlugin(
			Path.join(__dirname, 'dist'), ['/']
		),
	])
}

