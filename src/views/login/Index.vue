<template>
    <div class="relative w-full h-screen bg-white flex items-center justify-center">
        <!-- 登录框 -->
        <div class="bg-white/20 p-10 rounded-xl shadow-xl border border-gray-200">
            <div class="text-center text-3xl mb-8 flex flex-col">
                <span
                    class="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-900 pointer-events-none">
                    Lite Life
                </span>
            </div>
            <el-tabs v-model="activeTab" :stretch="true">
                <el-tab-pane label="密码登录" name="passwordLogin">
                    <el-form ref="loginFormRef" style="min-width: 400px" :model="loginForm" :rules="rules"
                        label-width="auto" size="large">
                        <el-form-item prop="email" label="邮箱: ">
                            <el-input v-model="loginForm.email" type="email"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码: ">
                            <el-input v-model="loginForm.password" type="password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="w-full" @click="handleLogin">登录</el-button>
                        </el-form-item>
                        <div class="flex justify-between mt-4 text-blue-400 text-sm">
                            <router-link to="/forget">忘记密码</router-link>
                            <router-link to="/register">去注册</router-link>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="验证码登录" name="codeLogin">
                    <el-form ref="codeLoginFormRef" style="min-width: 400px" :model="codeLoginForm" :rules="codeRules"
                        label-width="auto" size="large">

                        <el-form-item prop="email" label="邮箱: ">
                            <el-input v-model="codeLoginForm.email" type="email"></el-input>
                        </el-form-item>
                        <el-form-item prop="verificationCode" label="验证码: " id="verificationCode" maxlength="8">
                            <div class="flex flex-nowrap w-full items-center justify-center">
                                <div class="flex-grow">
                                    <el-input v-model="codeLoginForm.verificationCode"></el-input>
                                </div>
                                <el-button class="w-24" type="primary" @click="sendVerificationCode" :disabled="verificationSended">{{ verificationSended ? verificationSendTimer : "发送验证码" }}</el-button>
                            </div>
                            
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="w-full" @click="handleCodeLogin">登录</el-button>
                        </el-form-item>
                        <div class="flex justify-between mt-4 text-blue-400 text-sm">
                            <router-link to="/forget">忘记密码</router-link>
                            <router-link to="/register">去注册</router-link>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { RouterLink } from 'vue-router'

type LoginForm = {
    email: string,
    password: string,
    type: string
}

type CodeLoginForm = {
    email: string,
    verificationCode: string,
    type: string
}

const activeTab = ref('passwordLogin')

const loginForm = ref<LoginForm>({
    email: "",
    password: "",
    type: 'password'
})

const codeLoginForm = ref<CodeLoginForm>({
    email: "",
    verificationCode: "",
    type: "code"
})

const loginFormRef = ref<FormInstance>()
const codeLoginFormRef = ref<FormInstance>()

const rules = reactive<FormRules<LoginForm>>({
    email: [
        {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "input"]
        },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "input"]
        },
        {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: ["blur", "change"]
        }
    ]
})

const codeRules = reactive<FormRules<CodeLoginForm>>({
    email: [
        {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "input"]
        },
    ],
    verificationCode: [
        {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "input"]
        },
        {
            len: 8,
            message: "验证码长度必须为 8 位",
            trigger: ["blur", "change"]
        },
        {
            //数字和字母
            pattern: /^[a-zA-Z0-9]{8}$/,
            message: "验证码必须为数字和字母",
            trigger: ["blur", "change"]
        },
        
    ]
})

const handleLogin = () => {
    if (!loginFormRef.value) return
    loginFormRef.value.validate((valid) => {
        if (valid) {
            console.log('密码登录成功', loginForm.value)
            // 这里可以添加实际的密码登录逻辑
        } else {
            console.log('密码登录失败，请检查输入')
        }
    })
}

const handleCodeLogin = () => {
    if (!codeLoginFormRef.value) return
    codeLoginFormRef.value.validate((valid) => {
        if (valid) {
            console.log('验证码登录成功', codeLoginForm.value)
            // 这里可以添加实际的验证码登录逻辑
        } else {
            console.log('验证码登录失败，请检查输入')
        }
    })
}

const verificationSended = ref(false)
const verificationSendTimer = ref<number>(0)

const sendVerificationCode = () => {
    if (verificationSended.value) {
        console.log('验证码已发送，请勿重复发送')
        return
    }
    ElMessage({
        message: '验证码发送成功',
        type: 'success',
    })
    verificationSended.value = true
    verificationSendTimer.value = 60
    const timer = setInterval(() => {
        verificationSendTimer.value--
        if (verificationSendTimer.value <= 0) {
            clearInterval(timer)
            verificationSended.value = false
        }
    }, 1000)
}

const handleResetPassword = () => {
    console.log('跳转重置密码页面')
    // 这里可以添加实际的跳转重置密码页面逻辑
}

const handleGoRegister = () => {
    console.log('跳转注册页面')
    // 这里可以添加实际的跳转注册页面逻辑
}
</script>

<style lang="less" scoped>
/* 如果你需要额外的 Less 样式，可以在这里添加 */

</style>

