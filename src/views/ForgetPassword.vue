<template>
    <div class="relative w-full h-full bg-white flex items-center justify-center flex-wrap content-center gap-5">
        <div class="text-center text-9xl flex flex-col  ">
            <span
                class="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-900 pointer-events-none">
                Lite Life
            </span>
        </div>
        <div class="bg-white/20 px-10 pt-5 pb-2 shadow-sm border border-gray-200">
            <el-divider>
                重置密码
            </el-divider>
            <el-form ref="resetPasswordFormRef" style="width: 320px" v-model="forgetPasswordForm"
                :rules="forgetPasswordFormRules" label-position="left" label-width="auto">
                <el-form-item prop="email" label="邮箱: ">
                    <el-input v-model="forgetPasswordForm.email" type="email"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="新密码: ">
                    <el-input v-model="forgetPasswordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item props="captcha" label="验证码: ">
                    <div class="flex w-full gap-1">
                        <el-input class="grow" v-model="forgetPasswordForm.captcha"></el-input>
                        <CaptchaSendButton ref="cpatchaButtonRef" class="w-24" type="primary"
                            @send-captcha="sendCaptchaHandler" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" @click="handleReset">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" class="w-full" @click="toLogin">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { forgetPassword, sendCaptcha } from '@/api/methods/userApi';
import CaptchaSendButton from '@/components/captcha/CaptchaSendButton.vue';
import { ElMessage, type FormRules } from 'element-plus';
import { reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const toLogin = () => {
    router.push({
        name: 'login'
    })
}

type ForgetPasswordForm = {
    email: string,
    captcha: string,
    newPassword: string,
}

const forgetPasswordForm = reactive<ForgetPasswordForm>({
    email: '',
    captcha: '',
    newPassword: ''
})

const forgetPasswordFormRules = reactive<FormRules<ForgetPasswordForm>>({
    email: [
        {
            required: true,
            message: "邮箱是必填项",
            trigger: 'blur'
        }
    ],
    captcha: [
        {
            required: true,
            message: "验证码是必填项",
            trigger: 'blur'
        }
    ],
    newPassword: [
        {
            required: true,
            message: '新密码是必填项',
            trigger: 'blur'
        }
    ]
})

type CaptchaSendButtonType = InstanceType<typeof CaptchaSendButton>
const cpatchaButtonRef = ref<CaptchaSendButtonType>()

const sendCaptchaHandler = () => {
    sendCaptcha(forgetPasswordForm.email, 'login')
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

const handleReset = () => {

}

</script>

<style scoped lang="less"></style>