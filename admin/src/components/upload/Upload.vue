<template>
    <!-- action:自动上传时的接口 -->
    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
        :auto-upload="false" :on-change="handleChange">
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { computed } from 'vue'

import { Plus } from '@element-plus/icons-vue'

// 通过子传父

const props = defineProps({
    avatar: String
})
const emit = defineEmits(["kerwinchange"])



const uploadAvatar = computed(() =>
    props.avatar.includes("blob") ? props.avatar : 'http://localhost:3000/' + props.avatar
)
const handleChange = file => {
    emit("kerwinchange", file.raw)

}
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
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