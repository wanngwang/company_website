<template>
    <div class="container">
        <div class="news-header"
            :style="{ backgroundImage: `url(${require('@/assets/65f4b1eded11de02c7597133636f4ef3.jpeg')})` }">
        </div>
        <div class="search">
            <el-popover placement="bottom" title="检查结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <!-- <div>1111</div> -->
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data.tid" class="search-item"
                        @click="handleChangepage(data.tid)"">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description=" 暂无新闻" :img-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <!-- 24份 -->
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in  topNewsList" :key="item.tid">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangepage(item.tid)">
                        <div class="image" :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`
            }"></div>
                        <div style="padding: 14px;">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs style="margin: 20px; " v-model="whichTab" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.name" :key="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">

                        <div v-for="data in tabnews[item.name]" :key="data.tid" style="padding: 10px;">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover"
                                @click="handleChangepage(data.tid)">
                                <div class="tab-image" :style="{
                backgroundImage: `url(http://localhost:3000${data.cover})`
            }"></div>
                                <div style="padding: 14px; float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline style="max-width: 600px">
                            <el-timeline-item v-for="(data, index) in  tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>

            </el-tab-pane>
        </el-tabs>
        <el-backtop :visibilitu-height="100" />
    </div>
</template>
<style scoped lang="scss">
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;

    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        color: red;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}
</style>
<script setup>
import { Search, } from '@element-plus/icons-vue'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
moment.locale("zh-cn")
const searchText = ref("")
const visible = ref(false)
const newList = ref([])
const whichTab = ref(1)
onMounted(async () => {
    let res = await axios.get("/webapi/news/list")
    newList.value = res.data.data
    // console.log(_.groupBy(newList.value,item=>item.category));
})
const searchnewslist = computed(() => searchText.value ? newList.value.filter(item => item.title.includes(searchText.value)) : [])
// slice ,不影响原数组，最后不包含进去
const topNewsList = computed(() => newList.value.slice(0, 4))
const whichTime = time => {
    return moment(time).format("lll")
}


const tablist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    },
]

const tabnews = computed(() => _.groupBy(newList.value, item => item.category))

const router = useRouter()
const handleChangepage = (id) => {
    console.log(id)
    router.push(`/news/${id}`)
}

</script>