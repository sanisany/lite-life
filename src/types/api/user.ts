import type { Permit, Role } from "../common/rbac"
import type { SideMenu } from "../components/menu"

/**
 * 登录响应 / 刷新token响应
 */
export interface TokenResponse {
    access_token: string,
    expires_in: number,
    refresh_token: string,
}

/**
 * 刷新token请求
 */
export interface RefreshTokenRequest {
    refresh_token: string,
}


/**
 * 登录类型
 */
export enum LoginType {
    Password = 'password',
    Captcha = 'captcha',
}

/**
 * 登录请求
 */
export interface LoginRequset {
    email: string,
    credential: string,
    type: LoginType
}

export interface UserInfoResponse {
    id: string,
    userName: string,
    avatar?: string,
    menuList?: SideMenu[],
    roles?: Role[],
    permits?: Permit[]
}


