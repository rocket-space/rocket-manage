export const loading = ({dispatch, showOrHide}) => {
	dispatch('LOADING', showOrHide);
};

/*export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	if (params.delay === false) {
		return;
	} else {
		setTimeout(() => {
			store.dispatch('HIDEALERT');
		}, params.delay || 2500);
	}
};

export const hideAlert = (store) => {
	store.dispatch('HIDEALERT');
};

export const confirm = (store, params) => {
	store.dispatch('CONFIRM', params);
};

export const hideConfirm = (store) => {
	store.dispatch('HIDECONFIRM');
};

export const setPermission = (store, permission) => {
	store.dispatch('SETPERMISSION', permission);
};

export const controlSideNav = (store, params) => {
	store.dispatch('CONTROLSIDENAV', params);
};*/
