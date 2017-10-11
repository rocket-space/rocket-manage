import Vue from 'vue';
import store from 'store';
import actions from 'actions';

/**
 * @param {String} 		type 	校验权限类型 project/report/component/data
 * @param {Number} 		id 		类型ID
 * @param {Number} 		action 	操作类型 增删改查 0123
 * @return {Boolean} 			是否有相应权限
 */
export const checkPermission = (type = 'project', id, action = 3) => {
	console.info('type', type);
	let permission = store.state.permission[type];
	let target = permission.find((item) => {
		if (parseInt(item.id) === id) return item;
	});
	if (target && target.value.split('')[action] === '1') {
		return true;
	}
	actions.alert(store, {
		show: true,
		msg: '无权限！',
		type: 'danger'
	});
	return false;
};

export const upload = (file, cb) => {
	if (!/image\/.*/.test(file.type)) {
		actions.alert(store, {
			show: true,
			msg: '只能上传图片',
			type: 'danger'
		});
		return;
	}
	if (file.size / 1024 > 200) {
		actions.alert(store, {
			show: true,
			msg: '图片大小不能超过200KB',
			type: 'danger'
		});
		return;
	}
	let formData = new FormData();
	formData.append('file', file);
	Vue.http({
		url: 'upload',
		method: 'post',
		body: formData
	}).then((res) => {
		return res.json();
	}).then((res) => {
		cb(res);
	}).catch((e) => {});
};
