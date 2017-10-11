/**
 *
 Created by zhangzhao on 2017/9/13.
 Email: zhangzhao@gomeplus.com
 */
import GMP from 'GMP';

$(function () {
    new GMP({
        el: '#tabs',
        events: {
            'click .tab': 'onSwitch'
        },
        onSwitch:function (e) {
            var index = $(e.currentTarget).index();
            $(e.currentTarget).addClass("is-active").siblings().removeClass('is-active');
            $('.tabs-body .tabpane').eq(index).show(200).siblings().hide();
        },
        init: function () {
            $('.tabs li:eq(0)').click();
        }
    })
})