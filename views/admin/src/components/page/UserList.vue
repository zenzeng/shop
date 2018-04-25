<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>会员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="_id" label="编号" sortable width="100">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" width="120">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120">
            </el-table-column>
            <el-table-column prop="qq" label="QQ" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter" width="150">
            </el-table-column>
            <el-table-column prop="saveDate" label="注册时间" width="120">
            </el-table-column>
            <el-table-column prop="loginDate" label="登录时间" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="2"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                total : '',
                url: '/api/user/list',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d._id === self.del_list[i]._id){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                       /* if(d.address.indexOf(self.select_cate) > -1 &&
                            (d._id.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }*/
                        return d;
                    }
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/api/user/list';
                };
                self.$http.post(self.url, qs.stringify({page:self.cur_page})).then((res) => {
                    self.tableData = res.data.list;
                    self.total = res.data.count;
                })
            },
            search(){
                this.is_search = true;
                let self = this;
                self.$http.post(self.url, qs.stringify({page:self.cur_page, keywords : self.select_word})).then((res) => {
                    self.tableData = res.data.list;
                    self.total = res.data.count;
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                console.log(row);
                //使用vue中的router进行跳转，并传参数，效果：http://127.0.0.1:8086/#/userAdd?id=ryug4Z49b
                this.$router.push({path:'/userAdd', query:{id:row._id}});
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                let self = this;
                console.log(row);
                self.$http.post('/api/user/delete', qs.stringify({id:row._id})).then((res) => {
                    if(res.data.status = 'OK'){
                        this.$message.success('删除第'+(index+1)+'行成功！');
                        this.getData();
                    }else{
                        this.$message.error('删除第'+(index+1)+'行失败！');
                    }
                });
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i]._id + ',';
                }

                //批量删除
                self.$http.post('/api/user/delete', qs.stringify({id:str})).then((res) => {
                    if(res.data.status = 'OK'){
                        this.$message.success('删除成功：'+str);
                        this.getData();
                    }else{
                        this.$message.error('删除失败：'+str);
                    }
                });
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>