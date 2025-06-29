import { getUserInfo, login } from "@/api/methods/userApi";
import type { LoginRequset } from "@/types/api/user";
import type { UserInfo } from "@/types/stores/user";
import { defineStore } from "pinia";
import { reactive } from 'vue'

export const useUserStore = defineStore('userStore', () => {

    const info: UserInfo = {
        id: '',
        userName: '',
        avatar: '',
    }

    const userInfo = reactive(info)

    const getUser = () => {
        if (info.id) return;
        getUserInfo()
            .then(resp => {
                if (resp) {
                    userInfo.id = resp.id;
                    userInfo.userName = resp.userName;
                    userInfo.avatar = resp.avatar;
                    userInfo.menuList = resp.menuList;
                    userInfo.roles = resp.roles;
                    userInfo.permits = resp.permits;
                }

            })
    }

    const loginUser = (loginRequest: LoginRequset) : boolean => {
        login(loginRequest)
        .then(resp => {
            if(resp) {
                localStorage.setItem('access_token', resp.access_token)
                localStorage.setItem('refresh_token', resp.refresh_token)
                localStorage.setItem('expires_in', String(resp.expires_in))
                return true;
            }
            return false
        }).catch(err => {
            console.error('Login failed:', err);
            return false;
        })
        return false;
    }

    return {
        getUser,
        loginUser,
        userInfo
    }
})