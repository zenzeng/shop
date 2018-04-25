<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="form-box" style="width: 100%">
            <el-form ref="form" :model="form" label-width="150px">

                <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane label="基本信息" name="first">

                        <el-form-item label="商品分类">
                            <el-select v-model="cat_id" placeholder="请选择">
                                <el-option
                                        v-for="item in catList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="商品品牌">
                            <el-select v-model="brand_id" placeholder="请选择">
                                <el-option
                                        v-for="item in brandList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="商品LOGO">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://127.0.0.1:3000/api/upload/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="商品标题">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>

                        <el-form-item label="商品副标题">
                            <el-input v-model="form.briefTitle"></el-input>
                        </el-form-item>

                        <el-form-item label="库存">
                            <el-slider
                                    v-model="storageNum"
                                    show-input>
                            </el-slider>
                        </el-form-item>

                        <el-form-item label="商品简介">
                            <el-input type="textarea" v-model="form.briefDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="是否上架">
                            <el-switch on-text="" off-text="" v-model="form.is_enable"></el-switch>
                        </el-form-item>

                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="second">

                        <el-form-item label="上市年份">
                            <el-date-picker
                                    v-model="lineyear"
                                    align="right"
                                    type="year"
                                    placeholder="选择年">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="上市月份">
                            <el-date-picker
                                    v-model="linemonth"
                                    type="month"
                                    placeholder="选择月">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="颜色">
                            <el-color-picker v-model="color"></el-color-picker>
                        </el-form-item>

                        <el-form-item label="操作系统">
                            <el-radio class="radio" v-model="ios" label="1">IOS8</el-radio>
                            <el-radio class="radio" v-model="ios" label="2">IOS9</el-radio>
                            <el-radio class="radio" v-model="ios" label="3">Android6</el-radio>
                            <el-radio class="radio" v-model="ios" label="4">Android7</el-radio>
                        </el-form-item>

                        <el-form-item label="屏幕尺寸（英寸）">
                            <el-radio-group v-model="screensize">
                                <el-radio-button label="4.7英寸"></el-radio-button>
                                <el-radio-button label="5.5英寸"></el-radio-button>
                                <el-radio-button label="6英寸"></el-radio-button>
                                <el-radio-button label="6.5英寸"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="电池容量（mAh）">
                            <el-input-number v-model="beterysize" @change="handleChange" :min="1800" :max="5000"></el-input-number>
                        </el-form-item>

                        <el-form-item label="商品评分">
                            <el-rate
                                    v-model="range"
                                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                    :texts="['1分','2分','3分', '4分', '5分']"
                                    show-text>
                            </el-rate>
                        </el-form-item>

                        <el-form-item label="商品标签">
                            <el-transfer
                                    filterable
                                    :filter-method="filterMethod"
                                    filter-placeholder="请输入商品标签"
                                    v-model="tags"
                                    :data="tagdata">
                            </el-transfer>
                        </el-form-item>

                    </el-tab-pane>
                    <el-tab-pane label="商品价格" name="third">

                        <el-form-item label="市场价">
                            <el-input v-model="form.price"></el-input>
                        </el-form-item>

                        <el-form-item label="现价">
                            <el-input v-model="form.currentPrice"></el-input>
                        </el-form-item>

                        <el-form-item label="促销价">
                            <el-input v-model="form.promotPrice"></el-input>
                        </el-form-item>

                    </el-tab-pane>
                    <el-tab-pane label="商品描述" name="fourth">

                        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>

                    </el-tab-pane>
                    <el-tab-pane label="商品相册" name="fifth">

                        <el-upload
                                action="http://127.0.0.1:3000/api/upload/"
                                list-type="picture-card"
                                :on-success="handleAvatarSuccess2"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>

                    </el-tab-pane>

                </el-tabs>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="large" icon="edit">提交</el-button>
                    <el-button size="large">取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>
<script>
    import qs from 'qs';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            const generateData = _ => {
                const data = [];
                const cities = ['炫酷', '潮品', '时尚', '科技', '智能', '低碳', '环保'];
                const pinyin = ['xk', 'cp', 'ss', 'kj', 'zn', 'dt', 'hb'];
                cities.forEach((city, index) => {
                    data.push({
                        label: city,
                        key: city,
                        pinyin: pinyin[index]
                    });
                });
                return data;
            };
            return {
                pictures : [],
                dialogImageUrl: '',
                dialogVisible: false,
                range : '',
                storageNum : '',
                tagdata: generateData(),
                tags: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                ios:'',
                beterysize : '',
                screensize : '',
                color : '',
                lineyear : '',
                linemonth : '',
                catList: [{
                    value: '1',
                    label: '数码'
                }, {
                    value: '2',
                    label: '服装'
                }, {
                    value: '3',
                    label: '手机'
                }, {
                    value: '4',
                    label: '电脑'
                }, {
                    value: '5',
                    label: '鞋帽'
                }],
                cat_id: '',
                brandList: [{
                    value: '1',
                    label: '苹果'
                }, {
                    value: '2',
                    label: '华为'
                }, {
                    value: '3',
                    label: 'ZARA'
                }, {
                    value: '4',
                    label: 'HM'
                }, {
                    value: '5',
                    label: 'Nike'
                }],
                brand_id: '',
                content: '<p>请输入详细的商品描述</p>',
                editorOption: {
                    // something config
                },
                activeName: 'first',
                imageUrl: '',
                region: [{
                    label: '江苏',
                    cities: []
                }, {
                    label: '浙江',
                    cities: []
                }],
                props: {
                    value: 'label',
                    children: 'cities'
                },
                form: {
                    title: '',
                    briefTitle : '',
                    briefDesc : '',
                    is_enable: '',
                    price : '',
                    currentPrice : '',
                    promotPrice : '',
                }
            }
        },
        components: {
            quillEditor
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        methods: {
            handleRemove(file, fileList) {
                //删除pictures中存在的图片路径
                var index = this.pictures.indexOf(file.response.url);
                if (index > -1) {
                    this.pictures.splice(index, 1);
                }
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(value) {
                console.log(value);
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            onSubmit() {
                var param = {
                    logo : this.imageUrl,
                    cat_id : this.cat_id,
                    brand_id : this.brand_id,
                    title : this.form.title,
                    briefTitle : this.form.briefTitle,
                    storageNum : this.storageNum,
                    briefDesc : this.form.briefDesc,
                    is_enable : this.form.is_enable,
                    lineyear : this.lineyear,
                    linemonth : this.linemonth,
                    color : this.color,
                    ios : this.ios,
                    screensize : this.screensize,
                    beterysize : this.beterysize,
                    range : this.range,
                    tags : this.tags.join(','),
                    price : this.form.price,
                    currentPrice : this.form.currentPrice,
                    promotPrice : this.form.promotPrice,
                    desc : this.content,
                    pictures : this.pictures.join(',')
                };

                this.$http({
                    url : '/api/product/add',
                    method : 'post',
                    data : qs.stringify(param)
                }).then(function(response){

                    console.log(response);

                }).catch(function (error) {

                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error);

                });
                this.$message.success('提交成功！');
            },
            handleItemChange(val) {
                console.log('active item:', val);
                setTimeout(_ => {
                    if (val.indexOf('江苏') > -1 && !this.region[0].cities.length) {
                        this.region[0].cities = [{
                            label: '南京',
                            children : [{label:'鼓楼区1'}, {label:'鼓楼区2'}]
                        }];
                    } else if (val.indexOf('浙江') > -1 && !this.region[1].cities.length) {
                        this.region[1].cities = [{
                            label: '杭州',
                        }];
                    }

                    if (val.indexOf('南京') > -1 ) {
                        this.region[0].cities[0].children = [{
                            label: '鼓楼区'
                        }];
                    }

                }, 300);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = 'http://127.0.0.1:3000' + res.url;
                //this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess2(res, file) {
                this.dialogImageUrl = 'http://127.0.0.1:3000' + res.url;
                this.pictures.push(res.url);
                //this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .editor-btn{
        margin-top: 20px;
    }
</style>