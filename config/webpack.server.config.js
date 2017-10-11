import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseWebpackConfig from './webpack.base.config.js';


Object.keys(baseWebpackConfig.entry).forEach((name) => {
	baseWebpackConfig.entry[name] = ['./support/server.client.js'].concat(baseWebpackConfig.entry[name]);
});

let webpackConfig = {};

webpackConfig = merge(baseWebpackConfig, {
	devtool: '#source-map',
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		})
	]
});

export default webpackConfig;
