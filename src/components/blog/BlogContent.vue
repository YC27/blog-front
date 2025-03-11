<script setup>
import {MdPreview} from 'md-editor-v3';
import { ref } from 'vue'
import 'md-editor-v3/lib/style.css';

const props = defineProps({
  content: String,
  theme: {type: String, default: "light"},
  codeTheme: {type: String, default: "atom"},
  previewTheme: {type: String, default: "github"}
})
</script>

<template>
  <MdPreview
      class="blog-content"
      editor-id="preview"
      :model-value="props.content"
      :show-code-row-number="true"
      :theme="props.theme"
      :code-theme="props.codeTheme"
      :preview-theme="props.previewTheme"/>
</template>

<style scoped>
.blog-content {
  width: 100%;
}
</style>