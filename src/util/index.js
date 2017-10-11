export const mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

export const isEmptyObject = (e) => {
	for (let t in e) {
		return !1;
	}
	return !0;
};

export const isHttp = (url) => {
	return /^http|https:\/\//.test(url);
};

let utils = {};

utils.mixin = mixin;

export default utils;
