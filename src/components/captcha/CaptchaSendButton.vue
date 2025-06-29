<template>
    <el-button type="primary" @click.prevent="sendCaptchaClick" :disabled="!model.enabled">
        {{ current === 0 ? '发送验证码' : current }}
    </el-button>
</template>

<script setup lang="ts">

import { onBeforeUnmount, ref } from 'vue'

const emits = defineEmits(['click'])

export declare class CaptchaSendButtonModel {
    countdown: number
    text: string
    enabled: boolean
}

const model = defineModel<CaptchaSendButtonModel>({
    default: {
        countdown: 60,
        text: '发送验证码',
        enabled : true
    }
})

const current = ref<number>(0)

let timer: number = -1


const sendCaptchaClick = () => {
    if (current.value !== 0) return
    current.value = model.value.countdown
    model.value.enabled = false
    timer = setInterval(() => {
        current.value--;
        if (current.value === 0) {
            clearInterval(timer)
            model.value.enabled = true
        }
    }, 1000)
    emits('click')
}



onBeforeUnmount(() => {
    if (timer !== -1) {
        clearInterval(timer)
    }
})

defineExpose({
    reset: () => {
        clearInterval(timer)
        model.value.enabled = true
        current.value = 0        
    }
})


</script>

<style scoped lang="less"></style>