<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理"></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="category" label="分类" width="180">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" width="180">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}

                    </template>
                </el-table-column>
                <el-table-column label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)">

                        </el-switch>
                    </template>

                </el-table-column>


                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button :icon="Star" circle type="success" @click="handlePreview(scope.row)"></el-button>


                        <el-popconfirm title="你确定要删除吗？" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">

                            <template #reference>
                                <el-button :icon="Delete" circle type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                        <el-button :icon="Edit" circle @click="handleEdit(scope.row)"></el-button>



                    </template>


                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <div>
                <h2>
                    {{ previewData.title }}

                </h2>
                <div style="font-size: 12px; color: gray;">
                    {{ formatTime.getTime(previewData.editTime) }}
                </div>
                <el-divider>
                    <el-icon>
                        <star-filled />
                    </el-icon>
                </el-divider>
                <div v-html="previewData.content" class="htmlcontent">
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import router from '@/router';
import { useRoute } from 'vue-router';
import store from '@/store';


const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(() => {

    getTableData()
})
const getTableData = async () => {
    const res = await axios.get(`/adminapi/news/list`)
    // console.log(res.data.data[0],"****")
    const identify = res.data.data[0];
    if (identify.author == store.state.userInfo.username) {
        tableData.value = res.data.data
    }

}
// 格式化分类信息
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}
// 开关回调
const handleSwitchChange = async (item) => {

    // console.log(item);
    await axios.put(`/adminapi/news/publish`, {
        tid: item.tid,
        isPublish: item.isPublish
    })
    await getTableData()
}
// 预览回调
const handlePreview = (data) => {
    // console.log(data);
    previewData.value = data;
    dialogVisible.value = true
}
//删除回调
const handleDelete = async (item) => {
    // console.log(item);
    await axios.delete(`/adminapi/news/list/${item.tid}`)
    await getTableData()
}
// 编辑回调
const handleEdit = (item) => {
    console.log(item);
    router.push(`/news-manage/editnews/${item.tid}`)
}
</script>

<style scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent {
    img {
        min-width: 100%;
    }
}
</style>