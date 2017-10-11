import actions from 'actions';
import store from 'store';

export const check302 = (res = {}) => {
	// 302 未登陆，需要重定向到到登陆页
	return parseInt(res.code) === 302 && parseInt(res.iserror) === 1;
};

export const check403 = (res) => {
	// 403 访问接口无权限
	return parseInt(res.code) === 403 && parseInt(res.iserror) === 1;
};
