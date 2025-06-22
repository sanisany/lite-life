<template>
    <el-container class="base-layout">
        <el-header class="base-layout__header">
            <BaseHeader />
        </el-header>
        <el-container class="base-layout__inner">
            <el-aside class="base-layout__aside">
                <BaseAside />
            </el-aside>
            <el-main class="base-layout__main">
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseAside from '@/components/layout/base/BaseAside.vue'
import BaseHeader from '@/components/layout/base/BaseHeader.vue';
</script>

<style scoped lang="less">
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