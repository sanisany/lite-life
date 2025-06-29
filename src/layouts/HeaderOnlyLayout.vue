<template>
<el-container class="base-layout">
        <el-header class="base-layout__header">
            <BaseHeader :user="userStore.userInfo" />
        </el-header>
        <el-container class="base-layout__inner">
            <el-main class="base-layout__main">
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/layout/MainHeader.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
userStore.getUser()

</script>

<style lang="less" scoped>
.base-layout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.base-layout__header {
    height: var(--base-header-height);
    border: 1px solid var(--el-menu-border-color);
}
.base-layout__inner {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
}
.base-layout__aside {
    width: 200px;
    height: 100%;
}

.base-layout__main {
    width: 100%;
    height: 100%;
}

</style>