<template>
    <div class="relative w-full h-full bg-white flex items-center justify-center flex-wrap content-center gap-5">
        <div class="text-center text-9xl flex flex-col">
            <span
                class="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-900 pointer-events-none">
                Lite Life
            </span>
        </div>
        <!-- 登录框 -->
        <div v-loading="loading" class="bg-white/20 pt-2 px-10 pb-4 shadow-sm border border-gray-200 rounded-sm">
            <el-tabs v-model="activeTab" :stretch="true">
                <el-tab-pane label="密码登录" name="password" class="pt-5">
                    <el-form ref="loginFormRef" style="width: 320px" :model="loginForm" :rules="passwordRules"
                        @submit.prevent label-position="left" label-width="80px">
                        <el-form-item prop="email" label="邮箱: ">
                            <el-input v-model="loginForm.email" type="email"></el-input>
                        </el-form-item>
                        <el-form-item prop="credential" label="密码: ">
                            <el-input v-model="loginForm.credential" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button type="primary" class="w-full" @click="handleLogin(loginFormRef)">登录</el-button>
                        </el-form-item>
                        <div class="flex justify-between text-blue-400 text-sm">
                            <router-link to="reset">忘记密码</router-link>
                            <router-link to="register">去注册</router-link>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="验证码登录" name="captcha" class="pt-5">
                    <el-form ref="codeLoginFormRef" style="width: 320px" :model="loginForm" :rules="codeRules"
                        @submit.prevent label-position="left" label-width="80px">

                        <el-form-item prop="email" label="邮箱: ">
                            <el-input v-model="loginForm.email" ref="cpatchaEmailRef" type="email"></el-input>
                        </el-form-item>
                        <el-form-item prop="credential" label="验证码: ">
                            <div class="flex w-full gap-1">
                                <el-input class="grow" v-model="loginForm.credential"></el-input>
                                <CaptchaSendButton ref="cpatchaButtonRef" class="w-24" @click="sendCaptchaHandler" />
                            </div>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button type="primary" native-type="submit" class="w-full"
                                @click="handleLogin(codeLoginFormRef)">登录</el-button>
                        </el-form-item>
                        <div class="flex justify-between  text-blue-400 text-sm">
                            <router-link to="reset">忘记密码</router-link>
                            <router-link to="register">去注册</router-link>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { ElMessage, type FormInstance, type FormItemInstance, type FormRules } from 'element-plus'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { sendCaptcha, login } from '@/api/methods/userApi'
import { useRequest } from 'alova/client'
import CaptchaSendButton from '@/components/captcha/CaptchaSendButton.vue'
import { LoginType, type LoginRequset } from '@/types/api/user';

const route = useRoute()
const router = useRouter()

const activeTab = ref('password')

const loginForm = reactive<LoginRequset>({
    email: "",
    credential: "",
    type: LoginType.Password
})
watchEffect(() => {
    const activeTabValue = activeTab.value
    loginForm.type = activeTabValue as LoginType
    loginForm.credential = ''
})

type CaptchaSendButtonType = InstanceType<typeof CaptchaSendButton>
const loginFormRef = ref<FormInstance>()
const codeLoginFormRef = ref<FormInstance>()
const cpatchaButtonRef = ref<CaptchaSendButtonType>()

const passwordRules = reactive<FormRules<LoginRequset>>({
    email: [
        {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
        },
    ],
    credential: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur"
        }
    ]
})

const codeRules = reactive<FormRules<LoginRequset>>({
    email: [
        {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "input"]
        },
    ],
    credential: [
        {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "input"]
        },
        {
            len: 8,
            message: "验证码长度不正确",
            trigger: ["blur", "input"]
        }
    ]
})

const { loading, error, send } = useRequest(login, { immediate: false });

const handleLogin = (formEl: FormInstance | undefined) => {
    formEl?.validate(async (valid) => {
        if (valid) {
            
            send(loginForm)
                .then(res => {
                    if (res) {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })
                        const redirect = route.query.redirect as string | undefined;
                        console.log('redirect', redirect);
                        
                        if (redirect) {
                        } else {
                            router.push('/');
                        }
                    } else {
                        ElMessage({
                            message: '登录失败，请检查输入',
                            type: 'error',
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                    ElMessage({
                        message: '登录请求失败，请稍后再试',
                        type: 'error',
                    })
                })
        } else {
            console.log('登录失败，请检查输入')
        }
    })
}

const sendCaptchaHandler = () => {
    sendCaptcha(loginForm.email, 'login')
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

</script>

<style lang="less" scoped></style>
