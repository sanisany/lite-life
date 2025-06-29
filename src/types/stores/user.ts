import type { Permit, Role } from "../common/rbac"
import type { SideMenu } from "../components/menu"

/**
 * 用户信息
 */
export interface UserInfo {
    id: string,
    userName: string,
    avatar?: string,
    menuList?: SideMenu[],
    roles?: Role[],
    permits?: Permit[]
}

/**
 * 用户通知类型
 */
export enum NotificationType {
    System = 'system',
    Message = 'message',
}

/**
 * 用户通知
 */
export interface Notification {
    id: string,
    type: NotificationType,
    title: string,
    content: string,
    receivedAt: Date,
    readAt: Date | null,
    level: number
}


