<template>
    <div></div>
</template>

<style>
@import "../../../node_modules/nprogress/nprogress.css";
</style>
<script>
import nprogress from 'nprogress';
import pleaseWaitMe from 'utils/pleaseWaitMe.js';
import store from 'store';

nprogress.configure({
	showSpinner: false
});

export default {
	name: 'Loading',
	data() {
		return {
			width: 0
		};
	},
	vuex: {
		getters: {
			loading: state => state.loading
		}
	},
    created() {
	    console.log(store.state.loading);
    },
	watch: {
		loading: function() {
            if (this.loading) {
                if (this.loading.progress) {
                    nprogress.start();
                } else {
                    nprogress.done();
                }
                console.log('loading,,,,',this.loading.circle);
                if (this.loading.circle) {
                    pleaseWaitMe.wait();
                } else {
                    pleaseWaitMe.finish();
                }
            }
		}
	}
};
</script>
