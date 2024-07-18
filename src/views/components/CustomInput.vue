<script lang="ts" setup>
import { h } from 'vue'
import { ElInput } from 'element-plus'

const inputRef = shallowRef()

const modelValue = defineModel<string>()

defineExpose({
  inputRef
})
</script>

<template>
  <ElInput ref="inputRef" v-model="modelValue" placeholder="Please input" />
</template>
