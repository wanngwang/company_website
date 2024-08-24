<template>
    <div>
        <el-card>
            <el-page-header content="产品列表 " icon="" title="产品管理"></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" width="180" />
                <el-table-column prop="introduction" label="简要描述" width="180" />


                <el-table-column prop="editTime" label="更新时间" width="180">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}

                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">


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
    </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import router from '@/router';



const tableData = ref([])

onMounted(() => {

    getTableData()
})
const getTableData = async () => {
    const res = await axios.get(`/adminapi/product/list`)
    // console.log(res.data.data[0],"****")

    tableData.value = res.data.data


}



//删除回调
const handleDelete = async (item) => {
    // console.log(item);
    await axios.delete(`/adminapi/product/list/${item.pid}`)
    await getTableData()
}
// 编辑回调
const handleEdit = (item) => {
    console.log(item);
    router.push(`/product-manage/editproduct/${item.pid}`)
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