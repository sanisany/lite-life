import { defineStore } from "pinia";
import {ref, computed }from 'vue'
import type { ComputedRef } from "vue";

type UserInfo = {
    userId: string,
    username: string,
}

const userTokenKey = {
    accessToken: "__LITE_LIFE_ACCESS_TOKEN__",
    refreshToken: "__LITE_LIFE_REFRESH_TOKEN__"
}

export const useUserStore = defineStore('userStore', () => {
    localStorage.setItem(userTokenKey.accessToken, "123")
    let info: UserInfo = { userId: '', username: '' }
    const accessToken = localStorage.getItem(userTokenKey.accessToken)
    if(accessToken) {
        info = {
                userId: "1000001",
                username: "莫匆匆归去"
            }
    }

    const userInfo = ref<UserInfo>(info)

    const loggedIn: ComputedRef<boolean> = computed(() => {
        return userInfo.value.userId !== '' && userInfo.value.username !== ''
    })

    const doLogin = async (email: string, password: string) => {
        const response = await new Promise<UserInfo>((resolve) => {
            resolve({
                userId: "1000001",
                username: "莫匆匆归去"
            }) 
        })
        userInfo.value = response
    }

    return {
        userInfo,
        loggedIn,
        doLogin
    }
})