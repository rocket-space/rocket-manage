import path from 'path';

import webpack from 'webpack';

import baseConfig from './base.config.js';

import env from './env.config.js';

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const rootPath = path.join(__dirname, '../');

export default {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: baseConfig.build.assetsRoot,
		publicPath: baseConfig.build.assetsPublicPath,
		filename: '[name].js'
	},
	module: {
		loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
			{
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			include: rootPath,
			exclude: [path.join(rootPath, 'node_modules/'),
			path.join(rootPath, './src/assets/js/')],
			'query': {
				'plugins': ['lodash']
			}
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
            vue: 'vue/dist/vue.js',
			utils: path.join(rootPath, './src/util/'),
			store: path.join(rootPath, './src/vuex/'),
			actions: path.join(rootPath, './src/vuex/actions/'),
			echarts: path.join(rootPath, './src/assets/js/echarts.min.js')
		}
	},
	plugins: [
		new LodashModuleReplacementPlugin,
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new NyanProgressPlugin({
            nyanCatSays (progress, messages) {
                if (progress === 1) {
                    return '呦, 又在写 Bug 了?'
                }
            }
        })
	]
};
