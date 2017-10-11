import {pleaseWait} from '../assets/js/please-wait';

// please wait
let PleaseWaitMe = function() {};

PleaseWaitMe.prototype.wait = function() {
	this.o = pleaseWait({
		backgroundColor: 'rgba(217, 217, 217, .3)',
		loadingHtml: `<div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>`
	});
};

PleaseWaitMe.prototype.finish = function() {
	this.o && this.o.finish();
};

let pleaseWaitMe = new PleaseWaitMe();

export default pleaseWaitMe;
