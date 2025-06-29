<template>
    <div class="h-full">
        <el-menu class="h-full">
            <template v-for="(item, index) in menuList" :key="item.id">
                <el-sub-menu :index="item.id" v-if="item.children" >
                    <template #title>
                        <el-icon v-if="item.icon" :size="20">
                            <component :is="item.icon" />
                        </el-icon>
                        {{ item.name }}
                    </template>
                    <el-menu-item :index="sub.id" v-for="sub in item.children" @click="routerChange(sub.path)">
                        <el-icon v-if="sub.icon" :size="20">
                            <component :is="sub.icon" />
                        </el-icon>
                        {{ sub.name }} </el-menu-item>
                </el-sub-menu>
                <el-menu-item :index="item.id" @click="routerChange(item.path)" v-else>
                    <el-icon v-if="item.icon" :size="20">
                        <component :is="item.icon" />
                    </el-icon>
                    {{ item.name }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import type { SideMenu } from '@/types/components/menu';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    menuList: {
        type: Array as PropType<SideMenu[]>,
        default: () => []
    }
})

const routerChange = (path: string) => {
    router.push({
        path: path
    });
}
</script>

<style scoped lang="less"></style>