<template>
    <div class="wrapper">
        <div class="container">
            <div class="tabs" >
                <ul id="tabs">
                    <li class="tab"><a>项目说明</a></li>
                    <li class="tab"><a>基础配置</a></li>
                    <li class="tab"><a>Fake Data</a></li>
                </ul>
            </div>
            <div class="tabs-body">
                <div class="tabpane"><iframe :src="serverPath"></iframe></div>
                <div class="tabpane">
                    <div class="columns">
                        <div class="column is-half" id="configForm">
                            <div class="field">
                                <label class="label">项目名称</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.project" name="project" type="text" placeholder="项目名称">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">dev环境静态资源地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.devUrl" name="devUrl" type="text" placeholder="dev环境静态资源地址">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">pre环境静态资源地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.preUrl" name="preUrl" type="text" placeholder="pre环境静态资源地址">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">prod环境静态资源地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.prodUrl" name="prodUrl" type="text" placeholder="prod环境静态资源地址">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">dev环境API地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.devApi" name="devApi" type="text" placeholder="dev环境API地址">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">pre环境API地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.preApi" name="preApi" type="text" placeholder="pre环境API地址">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">prod环境API地址</label>
                                <div class="control">
                                    <input class="input control-input" v-model="config.prodApi" name="prodApi" type="text" placeholder="prod环境API地址">
                                </div>
                            </div>
                            <a class="button is-primary" @click="onSubmit" id="submit">提交</a>
                        </div>
                    </div>
                </div>

                <div class="tabpane">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" @click="onSwitch" v-model="picked" name="answer" value="1">
                            模板
                        </label>
                        <label class="radio">
                            <input type="radio" @click="onSwitch" v-model="picked" name="answer" value="2">
                            Fake Type
                        </label>
                        <div v-if="picked == 2" class="faker">
                            <div v-for="(value, key) in fakerData" class="field">
                                <label class="label"><a href="javascript:void 0;" @click="onShow">{{key}}</a></label>
                                <div v-for="(v,k) in value">
                                    <div class="columns">
                                        <div class="column is-one-third">
                                            <label class="checkbox">
                                                <input type="checkbox" v-model="checkedNames" :value="key+'.'+k">
                                                <button class="button" @click="onGenerate(key, k)">{{key + "." + k}}</button>
                                            </label>
                                        </div>
                                        <div class="column control">
                                            <input class="input " v-if="typeof v === 'string'" type="text" :value="v" :id="key+'_'+k">
                                            <textarea v-else class="textarea" name="" id="" cols="30" rows="10">{{v}}</textarea>
                                        </div>
                                    </div>

                                </div>
                                <div class="faker-divider"></div>
                            </div>
                            <button class="button" @click="onSetJSON">转换JSON</button>
                    </div>

                        <div id="jsoneditor" class="jsoneditor-wrap"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="loading_con transition" style="display:none" id="loading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <Loading></Loading>
    </div>
</template>
<style>
@import "assets/css/bulma.css";
@import "assets/css/style.css";
@import "assets/css/jsoneditor.css";

textarea {
    resize: none!important;
}
</style>
<script>
import serverPath from 'utils/serverPath';
import fetch from 'utils/fetch';
import faker from 'faker';
import JSONEditor from 'jsoneditor';
import jsonTemplate from '../tools/template.json';
//import backTop from './assets/js/backTop';
import Loading from './components/base/loading.vue';

export default {
	name: 'App',
    data() {
	    return {
	        picked: "1",
            checkedNames:[],
            faker:null,
	        fakerData: {

            },
	        serverPath: '/project/getReadme',
            pkg: {},
            config: {
                project: '',
                devUrl: '',
                preUrl: '',
                prodUrl: '',
                devApi: '',
                preApi: '',
                prodApi: ''
            }
        }
    },
    methods:{
        onClickPackage(){
            let that = this;
            fetch.get('/package/getPackage').then(res=>{
                that.pkg = res.data;
            });
        },
        onSubmit() {
            fetch.post('/config/updateConfig', {
                ...this.config
            }).then(res=>{
               console.log(res);
            });
        },
        onCheckAll() {
            $("input[name='selectFlag']").prop("checked", function( i, val ) {
                return !val;
            });
        },
        onUpgrade() {
            var aa = [];
            $("input[name='selectFlag']:checkbox:checked").each(function(){
                aa.push($(this).val());
            });
            fetch.post('/package/upgrade', {
                packs: aa.join(',')
            }).then(res=>{
                console.log(res);
            });
        },
        onSetJSON() {
            let json = {};
            this.checkedNames.forEach(current=>{
                let arr = current.split('.');
                let module = arr[0];
                let key = arr[1];
                !json[module] ? json[module] = {} : "";
                json[module][key] = this.fakerData[module][key];
            })
            this.editor.set(json);
        },
        onGenerate(module,k) {
            let value = this.faker[module][k]();
            $('#'+module+"_"+k).val(value);
            this.fakerData[module][k] = value;
        },
        onShow(e) {
            console.log(e);
        },
        onSwitch() {
            if (this.picked === "1") {
                this.editor.set(jsonTemplate);
            } else {
                this.editor.set({});
            }
        }
    },
    mounted() {
        /*new backTop({
            minHeight: 667  // 显示按钮的最小高度，默认屏幕高度一半
        });*/
        var container = document.getElementById('jsoneditor');
        var options = {
            modes: ['text', 'code', 'tree', 'form', 'view'],
            mode: 'code',
            ace: ace
        }
        this.editor = new JSONEditor(container, options, jsonTemplate);
    },
	created() {
	    let that = this;
		fetch.get('/config/getConfig').then(res=>{
		    that.config = res.data.data.data;
        });
        faker.locale = "zh_CN";
		this.faker = faker;
        var modules = Object.keys(faker);
        modules = modules.sort();
        modules.forEach(function(module) {
            var ignore = ['locale', 'locales', 'localeFallback', 'definitions', 'fake'];
            if (ignore.indexOf(module) !== -1) {
                return;
            }
            for (var method in faker[module]) {
                if (typeof faker[module][method] === "function") {
                    var val = faker[module][method]();
                    !that['fakerData'][module] ? that['fakerData'][module] = {} : "";
                    that['fakerData'][module][method] = val;
                }
            }
        });
	},
    components: {
        Loading
    }
};
</script>
