<template>
    <div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
            :options="options" />
    </div>
    <div class="formContainer">
        <h3>企业门户网站管理系统</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
            class="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>

import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'






const loginForm = reactive({
    username: "",
    password: ""
})//表单绑定的交互式对象
const loginFormRef = ref() //表单的引用对象

const loginRules = reactive({
    username: [{
        required: true, message: "请输入用户名", trigger: "blur"
    }],
    password: [{
        required: true, message: "请输入密码", trigger: "blur"
    }]
})
const router = useRouter()

const submitForm = () => {
    // 1.检验表单
    loginFormRef.value.validate((valid) => {
        if (valid) {


            axios.post("/adminapi/user/login", loginForm).then(res => {




                if (res.data.code == 1) {
                    store.commit("changeUserInfo", res.data.data)
                    store.commit("changeGetterRouter", false)

                    ElMessage.success('登录成功')
                    router.push("/index")

                }
                else {
                    ElMessage.error('用户密码不匹配')
                }

            })

        }
    })
    //2.拿到表单内容，交给后台
    //3.设置token
    // console.log("click");
}

// 引入tsparticles 模块
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import store from '@/store';

const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    // console.log("Particles container loaded", container);
};

// 配置 particles
const options = {
    // 配置背景色
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
</script>

<style lang="scss" scoped>
.formContainer {
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: white;
    text-align: center;
    padding: 20px;

}

h3 {
    font-size: 30px;
}

.loginForm {
    margin-top: 20px;
}

// 深度
:deep() .el-form-item__label {
    color: white;
}
</style>