<template>
    <div class="relative w-full h-full bg-white flex items-center justify-center flex-wrap content-center gap-5">
        <div class="text-center text-9xl flex flex-col  ">
            <span
                class="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-900 pointer-events-none">
                Lite Life
            </span>
        </div>

        <!-- 登录框 -->
        <div class="bg-white/20 px-10 pt-5 pb-2 shadow-sm border border-gray-200">
            <el-divider>
                注册
            </el-divider>
            <el-form ref="loginFormRef" style="width: 320px" :model="registerForm" :rules="registerFormRules"
                label-position="left" label-width="auto">
                <el-form-item prop="email" label="邮箱: ">
                    <el-input v-model="registerForm.email" type="email"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码: ">
                    <el-input v-model="registerForm.password" type="password" />
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码: ">
                    <el-input v-model="registerForm.confirmPassword" type="password" />
                </el-form-item>
                <el-form-item prop="code" label="验证码: ">
                    <div class="flex w-full gap-1">
                        <el-input class="grow" v-model="registerForm.code" type="password" />
                        <CaptchaSendButton ref="cpatchaButtonRef" class="w-24" v-model="captcha" type="primary"
                                    @send-captcha="sendCaptchaHandler" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" @click="handleRegister">注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" class="w-full" @click="toLogin">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { RouterLink, useRouter } from 'vue-router'
import CaptchaSendButton, {CaptchaSendButtonModel} from '@/components/captcha/CaptchaSendButton.vue'
import { useRequest } from 'alova/client'
import { sendCaptcha } from '@/api/methods/userApi'

const router = useRouter()



type RegisterForm = {
    email: string,
    normalizedEmail: string,
    password: string,
    confirmPassword: string,
    code: string
}

const registerForm = reactive<RegisterForm>({
    email: '',
    normalizedEmail: '',
    password: '',
    confirmPassword: '',
    code: ''
})

const validateSecondPass = (rule: any, value: string, callback: any) => {
    if (value !== registerForm.password) {
        callback(new Error("输入的两次密码不一致"))
    } else {
        callback()
    }
}

const registerFormRules = reactive<FormRules<RegisterForm>>({
    email: [
        {
            required: true,
            message: '邮箱是必填项.',
            trigger: ['blur', 'change']
        },
    ],
    password: [
        {
            required: true,
            message: '密码是必填项',
            trigger: 'blur'
        }
    ],
    confirmPassword: [
        {
            required: true,
            message: '确认密码是必填项',
            trigger: 'blur',
        },
        {
            validator: validateSecondPass,
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: "验证码是必填项",
            trigger: 'blur'
        }
    ]
})


type CaptchaSendButtonType = InstanceType<typeof CaptchaSendButton>
const cpatchaButtonRef = ref<CaptchaSendButtonType>()

const captcha = reactive<CaptchaSendButtonModel>({
    countdown: 60,
    text: '发送验证码',
    enabled: true
})

const sendCaptchaHandler = () => {
    sendCaptcha(registerForm.email, 'login')
        .then(res => {
            if (res) {
                ElMessage({
                    message: '验证码发送成功',
                    type: 'success',
                })
            } else {
                cpatchaButtonRef.value?.reset()
                ElMessage({
                    message: '验证码发送失败',
                    type: 'error',
                })
            }
        })
    }




const handleRegister = () => {

}

const toLogin = () => {
    router.push({
        name: 'login'
    })
}

</script>

<style lang="less" scoped>
/* 如果你需要额外的 Less 样式，可以在这里添加 */
</style>
