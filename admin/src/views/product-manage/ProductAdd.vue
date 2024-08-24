<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理"></el-page-header>
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm">
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />

            </el-form-item>
            <el-form-item label="产品详情描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />

            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @kerwinchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';

import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import router from '@/router';
import { ElMessage } from 'element-plus';
const productFormRef = ref()
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",

    file: null
})
const productFormRules = reactive({
    title: [

        { required: true, message: '请输入名字', trigger: 'blur' }
    ],
    introduction: [

        { required: true, message: '请输入简要描述', trigger: 'blur' }
    ],
    detail: [

        { required: true, message: '请输入详情描述', trigger: 'blur' }
    ],

    cover: [

        { required: true, message: '请上传产品图片', trigger: 'blur' }
    ]

})


const handleChange = file => {
    productForm.cover = URL.createObjectURL(file);
    productForm.file = file
}
const submitForm = () => {
    productFormRef.value.validate(async valid => {
        if (valid) {
            // console.log(productForm);
            await upload("/adminapi/product/add", productForm)
            // ElMessage.success("添加成功")
            router.push('/product-manage/productlist')
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}

::v-deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>