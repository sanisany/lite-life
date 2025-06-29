import type { ApiResult } from "@/types/api";
import type { UserInfoResponse } from "@/types/api/user";
import type { SideMenu } from "@/types/components/menu";
import type { UserInfo } from "@/types/stores/user";
import { defineMock } from "@alova/mock";

export default defineMock({
    '[POST]/api/login/{type}': ({ params }): ApiResult<boolean | null> => {
        const type = params.type
        const email = params.email
        const credential = params.credential

        if (type === 'password' && credential === '12345678') {
            return {
                code: 200,
                message: '',
                data: true
            }
        }
        if (type === 'captcha' && credential === '123456') {
            return {
                code: 200,
                message: '',
                data: true
            }
        }
        return {
            code: 200,
            message: '账号或密码错误',
            data: null
        }
    },

    '[GET]/api/user/info': (): ApiResult<UserInfoResponse | null> => {
        const success = {
            code: 200,
            message: '',
            data: {
                id: '1',
                userName: 'admin',
                avatar: 'https://t7.baidu.com/it/u=296756665,362100345&fm=193&f=GIF',
                menuList:
                    [
                        {
                            id: 'dashboard',
                            name: '看板',
                            icon: 'DataBoard',
                            path: '/dashboard'
                        },
                        {
                            id: 'pandisk',
                            name: '网盘',
                            icon: 'FolderOpened',
                            path: '/pandisk'
                        },
                        {
                            id: 'task',
                            name: '任务',
                            icon: 'Bell',
                            path: '/task'
                        },
                        {
                            id: 'admin',
                            name: '系统管理',
                            icon: 'Setting',
                            path: '/admin',
                            children: [
                                {
                                    id: 'admin-user',
                                    name: '用户管理',
                                    icon: 'User',
                                    path: '/admin/user'
                                },
                                {
                                    id: 'admin-system-config',
                                    name: '系统配置',
                                    icon: 'SetUp',
                                    path: '/admin/system-config'
                                },
                                {
                                    id: 'admin-log',
                                    name: '日志管理',
                                    icon: 'DocumentCopy',
                                    path: '/admin/log'
                                },
                            ]
                        }
                    ],
                roles: [
                    {
                        id: 'admin',
                        name: '管理员',
                    }
                ],
                permits: []
            }
        }

        const fail = {
            code: 401,
            message: '未登录',
            data: null
        }

        return fail
    }

    ,

    '[GET]/api/user/menu': (): ApiResult<SideMenu[]> => {
        return {
            code: 200,
            message: '',
            data: [
                {
                    id: 'home',
                    name: '首页',
                    icon: 'HomeFilled',
                    path: '/'
                },
                {
                    id: 'pandisk',
                    name: '网盘',
                    icon: 'FolderOpened',
                    path: '/pandisk'
                },
                {
                    id: 'task',
                    name: '任务',
                    icon: 'FolderOpened',
                    path: '/task'
                },
                {
                    id: 'admin',
                    name: '系统管理',
                    icon: 'Setting',
                    path: '/admin',
                    children: [
                        {
                            id: 'admin-user',
                            name: '用户管理',
                            icon: 'UserFilled',
                            path: '/admin/user'
                        },
                        {
                            id: 'admin-system-config',
                            name: '系统配置',
                            icon: 'UserFilled',
                            path: '/admin/system-config'
                        },
                        {
                            id: 'admin-log',
                            name: '日志管理',
                            icon: 'UserFilled',
                            path: '/admin/log'
                        },
                    ]
                }
            ]
        }

    },
})