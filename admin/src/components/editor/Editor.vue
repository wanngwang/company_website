<template>
    <div id="myEditor">

    </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue';

// 创建富文本编辑器 wangeditor模块
import E from "wangeditor"
const props = defineProps({
    content: String
})
const emit = defineEmits(["event"])
onMounted(() => {
    const editor = new E("#myEditor")
    editor.create()

    // 设置初始值
    props.content && editor.txt.html(props.content)
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
        //   console.log("change 之后最新的 html", newHtml);

        //   子传父
        emit("event", newHtml)
    };
})
</script>

<style lang="scss" scoped></style>