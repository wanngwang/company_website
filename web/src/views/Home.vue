<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item :key="1">
                <div :style="{ backgroundImage: `url(${require('@/assets/a0c6a18380f455f9252d7354bb10703f.jpg')})` }">
                </div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{ backgroundImage: `url(${require('@/assets/19cdb04595dbaf7c60810d60ad8be159.jpg')})` }">
                </div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{ backgroundImage: `url(${require('@/assets/cb98cf3bafdc0e6c2af7c7a0280432e2.jpg')})` }">
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代 </div>
    </div>

</template>
<style scoped lang="scss">
.el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.container {
    position: relative;
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: white;
    text-align: center;

}
</style>