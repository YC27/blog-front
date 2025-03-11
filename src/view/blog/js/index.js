import { ref } from "vue";
import { config } from 'md-editor-v3';


config({
    editorConfig: {

    }
});

export const theme = [
    "light",
    "dark"
]

export const themes = [
    // "default",
    "github",
    "vuepress",
    "mk-cute",
    "smart-blue",
    "cyanosis",
    "arknights",
]

export const code_themes = [
    "atom",
    "a11y",
    "github",
    "gradient",
    "kimbie",
    "paraiso",
    "qtcreator",
    "stackoverflow",
]

export const state = ref({
    text: '',
    // 定义语言名称
    themes: "github",
    code_themes: "atom",
    theme: "light"
});

export const blogSortList = ref([
    "前端",
    "后端",
    "Vue",
    "Java",
    "Python",
    "React",
    "Golang",
    "C#",
    "C++",
    "C",
    "UniApp",
    "Flutter",
    "Shell",
    "学习笔记",
    "随心记录",
    "生活趣事",
    "其他",
])