<template>
    <div>
        <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理"></el-page-header>
        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- 将来编辑再看看怎么改造 -->
                <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content" />
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @kerwinchange="handleUploadChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">更新新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup>

import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import router from '@/router';
import axios from 'axios';
const route = useRoute()
const newsFormRef = ref()
const newsForm = reactive({
    tid: 0,
    title: "",
    content: "",
    category: 1, //1.最新动态 2.典型案例 3 通知公告
    cover: "",
    file: null,
    isPublish: 0 //0未发布 1 已发布
})

const newsFormRules = reactive({
    title: [
        { required: true, message: "请输入标题", trigger: "blur" }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请输入分类", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "请上传图片", trigger: "blur" }
    ]
})





// 每次editor 内容改变的回调
const handleChange = (data) => {
    // console.log(data);
    newsForm.content = data
}

const options = [
    {
        label: "最新动态",
        value: 1
    },

    {
        label: "典型案例",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    },
]
const handleUploadChange = (file) => {
    newsForm.cover = URL.createObjectURL(file);
    newsForm.file = file
}
const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(newsForm);
            // 后台通信
            await upload("/adminapi/news/list", newsForm)
            router.back()
        }
    })
}

const handleBack = () => {
    router.back()
}
onMounted(async () => {
    console.log(route.params.id, "**************");
    const res = await axios.get(`/adminapi/news/getList/${route.params.id}`)
    console.log(res.data.data[0]);
    Object.assign(newsForm, res.data.data[0])
})

</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>