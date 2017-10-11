import {base64encode, base64decode} from './base64';

export function setCookie(name, value) {
	try {
		let Days = 30;
		let exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = base64encode(name) + '=' + base64encode(value) + ';expires=' + exp.toGMTString();
	} catch (e) {
		alert(e.message);
	}
}

export function deleteCookie(name) {
	name = base64encode(name);
	let expires = new Date(0);
	document.cookie = name + '=' + ';expires=' + expires.toUTCString();
}

export function getCookie(code) {
	let name = base64encode(code);
	let allcookies = document.cookie;
	name += '=';
	let pos = allcookies.indexOf(name);
	if (pos !== -1) {
		let start = pos + name.length;
		let end = allcookies.indexOf(';', start);
		if (end === -1) end = allcookies.length;
		let value = base64decode(allcookies.substring(start, end));
		return (value);
	} else return '';
}
