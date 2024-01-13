<template>
  <!-- 折叠面板-单元 -->
  <div class="aby-collapse" @click="handleCollapseClick">
    <div class="aby-collapse-title" :title="title">
      {{ title }}
    </div>
    <div class="aby-collapse-content">
      <div v-for="(item, index) in items" :key="index" class="aby-collapse-item">
        <p>{{ item.key }}</p>
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    items: {
        type: Array,
        default: () => [],
    },
});

const handleCollapseClick = (event) => {
    const target = event.target;
    const collapseTitle = target.closest('.aby-collapse-title');
    if (collapseTitle) {
        const collapse = target.closest('.aby-collapse');
        collapse.classList.toggle('show');
    }
};
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}
.aby-collapse {
    width: 70rem;
    height: auto;
    background-color: white;

    .aby-collapse-title {
        width: 100%;
        height: 4rem;
        background-color: white;
        font: {
            size: 2rem;
            weight: bold;
        }
        color: $blue-color;
        text-indent: 2rem;
        line-height: 4rem;
        border-bottom: #cccccc solid 1px;
        cursor: pointer;

        transition: all 0.2s ease-in-out;
    }

    .aby-collapse-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 0;
        overflow: hidden;

        transition: all 0.3s ease-in-out;

        /* 一级条目 */
        .aby-collapse-item {
            display: flex;
            flex-direction: row;
            align-items: center;

            margin-top: 0.8rem;

            p {
                margin-left: 2rem;
                &:nth-child(1) {
                    font: {
                        size: 1.6rem;
                        weight: bold;
                    }
                    color: black;
                }
                &:nth-child(2) {
                    font: {
                        size: 1.6rem;
                    }
                    color: $text-gray-color;
                }
            }

            /* 二级条目 */
            & .aby-collapse-item-2nd {
                margin-right: 4rem;

                p {
                    display: inline;
                }
            }
        }
    }

    /* 折叠面板展开-样式变化 */
    &.show .aby-collapse-title {
        background-color: #31384F;
        color: white;
    }
    &.show .aby-collapse-content {
        height: 12.5rem;
    }
}
</style>
