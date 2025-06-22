<template>
    <div class="flex item-center">
        <div class="header-logo">
            <span>Lite Life</span>
        </div>
        <div class="flex-grow"></div>
        <div class="flex items-center justify-center">
            <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
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
                    {{ userStore.userInfo.username }}
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

        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ChatLineSquare, ArrowDown } from '@element-plus/icons-vue'
const userStore = useUserStore()

</script>

<style scoped lang="less">
.header-logo {
    width: var(--base-aside-width);
    display: flex;

    span {
        line-height: var(--base-header-height);
        font-weight: bold;
        color: rgb(255, 157, 255);
        font-size: calc(var(--base-header-height) / 3);
    }
}

:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}
</style>