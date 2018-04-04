const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web', // 指定是web平台
	entry: path.join(__dirname, 'src/index.js'),	// 入口文件
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader', // url-loader 用于吧图片一直转换层base64
						options: {
							limit: 1024,
							name: '[name]-aaa.[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HTMLPlugin()
	]
}


// 根据环境设置
if (isDev) {
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			errors: true,  // 编译过程中发生错误直接显示在网页上
		},
		hot: true // 无刷新
		// historyFallback: {

		// }
		// open: true // 启动webpack时打开默认浏览器
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}

module.exports = config