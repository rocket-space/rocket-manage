import Vue from 'vue';

/**
 * [description]
 * @param  {string} value   时间戳
 * @param  {string} format  格式化格式 例: 'yyyy-MM-DD'
 * @return {string}         格式化好的时间
 */
Vue.filter('Date', function(value, format) {
	return new Date(value).Format(format);
});

Vue.filter('Object', function(value) {
	if (value) {
		return Object.values(value).join(' ');
	} else {
		return '';
	}
});

Vue.filter('isEmpty', function(value) {
	if (Object.keys(value).length === 0) {
		return true;
	} else {
		return false;
	}
});

Vue.filter('isNotEmptyAdvice', function(value) {
	let res = Object.values(value).reduce((p, n) => {
		return p + n.offending.length;
	}, 0);
	if (res === 0) {
		return false;
	} else {
		return true;
	}
});

Vue.filter('toKB', function(value) {
	return (value / 1024).toFixed(2) + 'KB';
});

Vue.filter('trim', function(value) {
	return value.replace(/(^\s*)|(\s*$)/g, '');
});

Date.prototype.Format = function(fmt) {
	const o = {
		'M+': this.getMonth() + 1, // 月份
		'd+': this.getDate(), // 日
		'h+': this.getHours(), // 小时
		'm+': this.getMinutes(), // 分
		's+': this.getSeconds(), // 秒
		'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
		'S': this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	}
	return fmt;
};
