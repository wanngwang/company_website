<template>
    <el-aside width="$store.state.isCollapsed?'64px':'240px'">
        <!-- 是否展开 -->
        <!--  是否开启折叠动画-->
        <el-menu :collapse="$store.state.isCollapsed" :collapse-transition="false" :router="true"
            :default-active="route.fullPath">
            <el-menu-item index="/index">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>


            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    <span>用户管理</span>
                </template>

                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>



            </el-sub-menu>

            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <message-box />

                    </el-icon>
                    <span>新闻管理</span>
                </template>

                <el-menu-item index="/news-manage/addnews">创建新闻</el-menu-item>
                <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>



            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <reading />
                    </el-icon>
                    <span>产品管理</span>
                </template>

                <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>



            </el-sub-menu>
            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <Pointer />
                    </el-icon>
                    <span>产品管理</span>
                </template>

                <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>



            </el-sub-menu>

        </el-menu>


    </el-aside>
</template>
<script setup>
import { useRoute } from 'vue-router';
import store from '@/store';
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from '@element-plus/icons-vue'
const vAdmin = {
    mounted(el) {
        // console.log(el)
        if (store.state.userInfo.role !== '1') {
            el.parentNode.removeChild(el)
        }
    }
}
const route = useRoute()
// 当前路径
// console.log(route.fullPath);
</script>
<style lang="scss" scoped>
.el-aside {
    height: 100vh;

    .el-menu {
        height: 100vh;
    }
}
</style>