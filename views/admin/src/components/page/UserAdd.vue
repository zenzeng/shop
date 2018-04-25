<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增会员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="头像上传">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>

                <el-form-item label="QQ">
                    <el-input v-model="form.qq"></el-input>
                </el-form-item>

                <el-form-item label="所属区域">
                    <el-cascader :options="region" v-model="form.region_id" @active-item-change="handleItemChange" :props="props"></el-cascader>
                </el-form-item>

                <el-form-item label="详细地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="出生日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        <el-radio label="未知"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="标签">
                    <el-checkbox-group v-model="form.tag">
                        <el-checkbox label="喜欢数码"></el-checkbox>
                        <el-checkbox label="K歌"></el-checkbox>
                        <el-checkbox label="旅游"></el-checkbox>
                        <el-checkbox label="钱"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch on-text="" off-text="" v-model="form.is_enable"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    import qs from 'qs';
    export default {
        data: function(){
            return {
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
                    username: '',
                    password : '',
                    email : '',
                    mobile : '',
                    qq : '',
                    region_id: '',
                    address : '',
                    birthday: '',
                    sex: '',
                    tag: '',
                    desc: '',
                    is_enable: '',
                }
            }
        },
        methods: {
            onSubmit() {
                var param = {
                    logo : this.imageUrl,
                    username : this.form.username,
                    password : this.form.password,
                    mobile : this.form.mobile,
                    email : this.form.email,
                    qq : this.form.qq,
                    region_id : this.form.region_id,
                    address : this.form.address,
                    birthday : this.form.birthday,
                    sex : this.form.sex,
                    tag : this.form.tag,
                    desc : this.form.desc,
                    is_enable : this.form.is_enable
                };

                var id = this.$route.query.id;
                //如果id不存在，说明是新增用户
                if(!id){
                    this.$http({
                        url : '/api/user/useradd',
                        method : 'post',
                        data : qs.stringify(param)
                    }).then(function(response){
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }else{
                    //如果id存在， 说明是更新用户信息
                    param.id = id;
                    this.$http({
                        url : '/api/user/edit',
                        method : 'post',
                        data : qs.stringify(param)
                    }).then(function(response){
                        console.log(response);
                    }).catch(function (error) {
                        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        console.log(error);
                    });
                }

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
                this.imageUrl = URL.createObjectURL(file.raw);
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
        },
        mounted: function(){
            //获取url中的参数id
            const self = this;
            var id = this.$route.query.id;
            if(id){
                var param = {id : id};
                this.$http.post('/api/user/info', qs.stringify(param)).then(function(response){
                    var info = response.data.list;
                    console.log(info);
                    self.form.username = info.username;
                    self.form.password = info.password;
                    self.form.email = info.email;
                    self.form.mobile = info.mobile;
                    self.form.qq = info.qq;
                    self.form.region_id = info.region_id;
                    self.form.address = info.address;
                    self.form.birthday = info.birthday;
                    self.form.sex = info.sex;
                    self.form.tag = info.tag;
                    self.form.desc = info.desc;
                    self.form.is_enable = info.is_enable;
                }).catch(function (error) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error);
                });
            }
        },
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
</style>