export const LOADING = (state, showOrHide) => {
	state.loading = showOrHide;
};

export const ALERT = (state, params) => {
	state.alertConfig.show = params.show;
	state.alertConfig.msg = params.msg || 'alert msg';
	state.alertConfig.type = params.type || 'info'; // info/warning/success/danger
	state.alertConfig.delay = params.delay || 2500; // false will not auto hide
	state.alertConfig.dismissible = params.dismissible || false;
};

export const HIDEALERT = (state) => {
	state.alertConfig.show = false;
};

export const CONFIRM = (state, params) => {
	state.confirmConfig.show = params.show;
	state.confirmConfig.title = params.title || 'Confirm';
	state.confirmConfig.type = params.type || 'default';
	state.confirmConfig.msg = params.msg || 'confirm msg';
	state.confirmConfig.applyFunc = params.applyFunc || function() {};
	state.confirmConfig.cancelFunc = params.cancelFunc || function() {};
	state.confirmConfig.applyStr = params.applyStr || 'Apply';
	state.confirmConfig.cancelStr = params.cancelStr || 'Cancel';
};

export const HIDECONFIRM = (state) => {
	state.confirmConfig.show = false;
};

export const SETPERMISSION = (state, permission) => {
	state.permission = permission;
};

export const CONTROLSIDENAV = (state, params) => {
	state.sideNavShow = params;
};
