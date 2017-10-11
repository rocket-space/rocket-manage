import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { exec } from 'child_process';

export const cssExtractLoaders = (options) => {
	options = options || {};

	function generateLoaders(loaders) {
		let sourceLoader = loaders.map((loader) => {
            return loader + '-loader';
		});

        return ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['vue-style-loader'].concat(sourceLoader)
        });

		/*if (options.extract) {
			// return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
			return ExtractTextPlugin.extract({
				fallback: 'css-loader',
				use: ['vue-style-loader'].concat(sourceLoader)
            });
		} else {
			return ['vue-style-loader', sourceLoader].join('!');
		}*/
	}

	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass?indentedSyntax']),
		scss: generateLoaders(['css', 'sass']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	};
};

export const openUrl = (url) => {
	const execStr = process.platform === 'win32' ? 'start' : 'open';
	exec(`${execStr} ${url}`);
};
