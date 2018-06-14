const path = require('path')

const PORT = process.env.PORT || 5000

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')


module.exports = {

	mode: 'development',
	
	entry: {
		'test-app': [
			`webpack-dev-server/client?http://localhost:${PORT}`,
			`./src/init-mem`
		],
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},

	module: {

		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader',
			},
		]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},

	performance: {
		hints: false
	},

	devtool: 'eval-source-map',

	devServer: {
		port: PORT,
		inline: true,
		hot: false,
		historyApiFallback: true,
		stats: 'minimal',
		contentBase: './dist/',
	},

	plugins: [
		new HardSourceWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({ watch: 'src', workers: 3})
	]
}