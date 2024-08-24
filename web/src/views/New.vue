<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <h2>
                {{ currentNews.title }}
            </h2>
            <div class="time">
                {{ whichTime(currentNews.editTime) }}
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="currentNews.content"></div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px; font-weight: bold; ">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item.tid" class="text item" style="padding:14px;"
                    @click="handleChange(item.tid)">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>

import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

import moment from 'moment'
import { StarFilled } from '@element-plus/icons-vue'
moment.locale("zh-cn")
const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])
watchEffect(async () => {
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data
})
const whichTime = time => {
    return moment(time).format("lll")
}

const handleChange = (id) => {
    router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>