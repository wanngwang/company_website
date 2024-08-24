<template>
    <div>
        <el-page-header content="个人中心" icon="" title="企业门户网站管理系统"></el-page-header>
    </div>
    <el-row :gutter="20" class="el-row">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="100" :src="avatarUrl" />
                <h3>{{ store.state.userInfo.username }}</h3>
                <h3>{{ store.state.userInfo.role === '1' ? '管理员' : '编辑' }}</h3>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                    </div>
                </template>
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人简介" prop="introduction">
                        <el-input v-model="userForm.introduction" type="textarea" />

                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <Upload :avatar="userForm.avatar" @kerwinchange="handleChange" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col></el-col>

    </el-row>
</template>
<script setup>

import { computed, reactive, ref } from 'vue'
import store from '@/store';
import { ElMessage } from 'element-plus';


import Upload from '@/components/upload/Upload.vue'

import upload from '@/util/upload'



const avatarUrl = computed(() =>
    store.state.userInfo.avatar ? 'http://localhost:3000/' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const { username, gender, introduction, avatar } = store.state.userInfo

const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null
})
const userFormRules = reactive({
    username: [

        { required: true, message: '请输入名字', trigger: 'blur' }
    ],
    gender: [

        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    introduction: [

        { required: true, message: '请输入个人介绍', trigger: 'blur' }
    ],
    avatar: [

        { required: true, message: '请上传头像', trigger: 'blur' }
    ]

})
// 性别选择
const options = [
    {
        label: "保密",
        value: 0,
    },
    {
        label: "男",
        value: 1,
    },
    {
        label: "女",
        value: 2,
    }
];
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file
}

const submitForm = () => {
    // 触发校验
    userFormRef.value.validate(async valid => {
        if (valid) {
            const res = await upload("/adminapi/user/upload", userForm)

            console.log(res, "@@@@");
            if (res.code == 1) {
                store.commit("changeUserInfo", res.data)
                ElMessage.success("更新成功")
            }
        }
    })
}


</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
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
