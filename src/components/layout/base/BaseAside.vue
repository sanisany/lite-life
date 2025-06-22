<template>
    <div class="h-full">
        <el-menu class="h-full">
            <template v-for="item in menus" :key="item.id">
                <el-sub-menu :index="item.id" v-if="item.children">
                    <template #title> {{ item.name }} </template>
                    <el-menu-item :index="sub.id" v-for="sub in item.children"> {{ sub.name }} </el-menu-item>
                </el-sub-menu>
                <el-menu-item :index="item.id" v-else>
                    {{ item.name }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface SideMenuItem {
    id: string,
    name: string,
    description: string | null,
    icon: string | null,
    href: string,
    children: SideMenuItem[] | null | undefined,

}

const menus = reactive<SideMenuItem[]>([
    {
        id: "dashboard",
        name: "仪表盘",
        description: null,
        icon: null,
        href: "/dashboard",
        children: undefined
    },
    {
        id: "user-management",
        name: "用户管理",
        description: null,
        icon: null,
        href: "/users",
        children: undefined
    },
])
</script>

<style scoped lang="less">

</style>