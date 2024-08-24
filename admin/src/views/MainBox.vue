<template>
    <div>

        <el-container>
            <side-menu></side-menu>
            <!-- container flex布局 -->
            <el-container direction="vertical">
                <top-header></top-header>
                <el-main> <router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import TopHeader from '../components/mainbox/TopHeader'

import SideMenu from '../components/mainbox/SideMenu'



</script>
<style lang="scss" scoped>
.el-main {
    overflow: auto;
    //头部不滚动，滚动
    height: calc(100vh - 60px);
}
</style>