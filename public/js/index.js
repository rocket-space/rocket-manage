/**
 *
 Created by zhangzhao on 2017/9/13.
 Email: zhangzhao@gomeplus.com
 */
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
    new GMP({
        el: '#configForm',
        data: {
            form: {

            }
        },
        events: {
            'input .control-input': 'onChange',
            'click #submit': 'onSubmit'
        },
        onSubmit:function(e) {
            $.ajax({
                url: '/updateConfig',
                method: 'post',
                data: this.data.form,
                success: function (res) {

                }
            })
        },
        onChange:function(e) {
            this.data.form[e.target.name] = e.target.value;
        },
        init:function() {
            var that = this;
            $.ajax({
                url: '/getConfig',
                success: function (res) {
                    that.$el.html(GMP.template('configTmpl')({
                        data: res.data.data
                    }));
                }
            })
        }
    });
    new GMP({
        el: '#packagePanel',
        events: {
            'click #upgrade': 'onUpgrade',
            'click #checkAll': 'onCheckAll'
        },
        onUpgrade:function() {
            var aa = [];
            $("input[name='selectFlag']:checkbox:checked").each(function(){
                aa.push($(this).val());
            });
            $.ajax({
                url: '/upgrade',
                data: {
                    packs: aa.join(',')
                },
                success: function (res) {

                }
            })
        },
        onCheckAll:function() {
            $("input[name='selectFlag']").prop("checked", function( i, val ) {
                return !val;
            });
        }
    });

    $('#package-id').click(function () {
        $.ajax({
            url: '/getPackage',
            success: function (res) {
                $('#packageUl').html(GMP.template('packageTmpl')({
                    data: res
                }));
            }
        })
    });

    $(document).ajaxStart(function(){
        $('.loading_con').show();
    });
    $(document).ajaxComplete(function(){
        $('.loading_con').hide();
    });
})