<template>
    <div class="flex item-center">
        <div class="header-logo">
            <span
                class="font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-900 pointer-events-none">
                Lite Life
            </span>
        </div>
        <div class="flex-grow"></div>
        <div class="flex items-center justify-center">
            <template v-if="user.id">
                <el-avatar :size="30" :src="user.avatar" />
                <el-dropdown class="px-2 mx-2">
                    <span class="mt-1">
                        <el-badge is-dot>
                            <el-icon :size="16">
                                <ChatLineSquare />
                            </el-icon>
                        </el-badge>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-badge :value=0>
                                    <button class="px-2">
                                        通知
                                    </button>
                                </el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-badge :value=0>
                                    <button class="px-2">
                                        待办
                                    </button>
                                </el-badge>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <span>
                        {{ user.userName }}
                        <el-icon>
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <button>个人信息</button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </template>
            <template v-else>
                <RouterLink to="/login">登录</RouterLink>

            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChatLineSquare, ArrowDown } from '@element-plus/icons-vue'
import { type PropType } from 'vue';
import type { UserInfo } from '@/types/stores/user';

defineProps({
    user: {
        type: Object as PropType<UserInfo>,
        default: () => ({
            id: '',
            avatar: '',
            userName: '',
            email: ''
        })
    }
})


</script>

<style scoped lang="less">
.header-logo {
    width: var(--base-aside-width);
    display: flex;

    span {
        line-height: var(--base-header-height);
        font-weight: bold;
        font-size: calc(var(--base-header-height) / 3);
    }
}

:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}
</style>