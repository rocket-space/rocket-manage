export default {
	loading: {
		progress: false,
		circle: false
	},
	alertConfig: {
		show: false,
		msg: 'alert message!', // support
		type: 'info', // info/warning/success/danger
		dismissible: false,
		delay: 2500
	},
	confirmConfig: {
		show: false,
		title: 'Confirm',
		msg: 'confirm msg',
		type: 'default', // default/primary/success/info/warning/danger
		applyFunc: 'func',
		cancelFunc: 'func',
		applyStr: 'Apply',
		cancelStr: 'Cancel'
	},
	permission: {},
	loginUrl: 'http://sso.gomeplus.com:18080/cas/login?service=http://toybrick.gomeplus.com:8080/toy-brick/cas',
	sideNavShow: false
};
