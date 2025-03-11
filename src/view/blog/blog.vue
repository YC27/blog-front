<script setup>
import {MdEditor} from 'md-editor-v3';
import { UP_LOAD_URL } from "../../util/url.js";
import {themes, code_themes, theme} from "./js/index.js";
import { blogSortList } from "./js/index.js";
import 'md-editor-v3/lib/style.css';
import {useUserStore} from "../../store/user.js";
import {onMounted, ref} from "vue";
import {getToken} from "../../util/auth.js";
import axios from "axios";
import BlogContent from "../../components/blog/BlogContent.vue";
import { getList, addTag } from "../../api/blog/tag.js";
import { getList as _getClassificationList, addClassification } from "../../api/blog/classification.js";
import {errorMsg, successMsg} from "../../util/box.js";
import {addOrUpdate, getArticleById} from "../../api/blog/blog.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const showBar = ref(true)
const tab = ref(4)
const promptDialogVisible = ref(false)
const exclude = ref([
  "github"
])
const tagList = ref([])
const classificationList = ref([])
const noteMode = ref({
  title: '',
  content: '',
  tagId: '',
  classificationId: '',
  blogSort: '',
  blogPrivate: "1",
  coverSrc: '',
  blogStatus: 0,
  userId: userStore.user.userId,
  previewTheme: 'github',
  codeTheme: 'atom',
  theme: 'light'
})

const uploadImage = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);
          axios
              .post(UP_LOAD_URL, form, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': getToken()
                }
              })
              .then((res) => rev(res.data))
              .catch((error) => rej(error));
        });
      })
  );
  callback(res.map((item) => item.data.url));
}

// blog 保存发布
const currentStatus = ref(0)
const getTagList = async () => {
  await getList().then(res => {
    tagList.value = res.data.articleTagList
  })
}
const getClassificationList = async () => {
  await _getClassificationList().then(res => {
    classificationList.value = res.data.classificationList;
  })
}
const getArticle = () => {
  if ( route.query.blogId ) {
    getArticleById(route.query.blogId).then(res => {
      noteMode.value = res.data.blog
      noteMode.value.blogPrivate = noteMode.value.blogPrivate.toString()
      noteMode.value.blogSort = noteMode.value.blogSort.split(',')
    })
  }
}

onMounted(() => {
  getTagList()
  getClassificationList()
  getArticle()
})
const push = () => {
  currentStatus.value = 1
  save()
}
const onlySave = () => {
  currentStatus.value = 0
  save()
}
const save = () => {
  if ( !noteMode.value.title ) {
    errorMsg("请填写标题")
    return
  }
  if ( !noteMode.value.blogSort.length ) {
    errorMsg("请填写分类")
    return
  }
  if ( !noteMode.value.classificationId ) {
    errorMsg("请填写分类夹")
    return
  }
  if ( !noteMode.value.tagId ) {
    errorMsg("请填写标签")
    return
  }
  if ( !noteMode.value.content ) {
    errorMsg("请填写内容")
    return;
  }
  noteMode.value.blogStatus = currentStatus.value
  noteMode.value.blogSort = noteMode.value.blogSort.toString()
  addOrUpdate(noteMode.value).then(res => {
    if ( res.success ) {
      successMsg("操作成功")
      if ( currentStatus.value === 0 ) {
        noteMode.value = {
          ...res.data.blog,
          blogSort: noteMode.value.blogSort.split(','),
          blogId: res.data.blog.blogId,
          blogPrivate: res.data.blog.blogPrivate.toString()
        }
      } else {
        router.push({path: "/index"})
      }
    } else {
      errorMsg("网络错误,稍后再试")
    }
  })
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    errorMsg("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    errorMsg("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}


const handleAvatarSuccess = (response, _) => {
  if (response.success) {
    noteMode.value.coverSrc = response.data.url
  }
}
const head = ref({
  "authorization": getToken(),
})
// 添加标签
const addNewTagDialog = ref(false)
const tagModel = ref({
  tagId: '',
  tagName: '',
  userId: userStore.user.userId
})
const cancelAddTag = () => {
  tagModel.value = {
    tagId: '',
    userId: userStore.user.userId,
    tagName: ''
  }
  addNewTagDialog.value = false
}
const confirmAddTag = () => {
  if ( !tagModel.value.tagName ) {
    errorMsg("请输入标签名称")
    return
  }
  addTag(tagModel.value).then(res => {
    if ( res.success ) {
      successMsg("添加成功")
      getTagList()
    } else {
      errorMsg("网络错误,稍微再试")
    }
  })
  addNewTagDialog.value = false
}

// 添加分类
const addNewClassificationDialog = ref(false)
const classificationModel = ref({
  classificationId: '',
  classificationTitle: '',
  userId: userStore.user.userId
})
const cancelAddClassification = () => {
  classificationModel.value = {
    classificationId: '',
    classificationTitle: '',
    userId: userStore.user.userId
  }
  addNewClassificationDialog.value = false
}
const confirmAddClassification = () => {
  if ( !classificationModel.value.classificationTitle ) {
    errorMsg("请输入分类夹名称")
    return
  }
  addClassification(classificationModel.value).then(res => {
    if ( res.success ) {
      successMsg("添加成功")
      getClassificationList()
    } else {
      errorMsg("网络错误,稍微再试")
    }
  })
  addNewClassificationDialog.value = false
}

</script>

<template>
<div style="width: 80%;margin: 20px auto">
<!--  <BlogContent :noteMode="noteMode"/>-->
  <el-card>
    <el-row :gutter="10" class="article-header">
      <el-col :span="1">
        <h4>标题</h4>
      </el-col>
      <el-col :span="18">
        <el-input v-model="noteMode.title"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="article-header">
      <el-col :span="6">
        <span class="article-header-title">时间样式</span>
        <el-select v-model="noteMode.theme">
          <el-option
              v-for="item in theme"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="article-header-title">代码主题</span>
        <el-select v-model="noteMode.codeTheme">
          <el-option
              v-for="item in code_themes"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="article-header-title">预览主题</span>
        <el-select v-model="noteMode.previewTheme">
          <el-option
              v-for="item in themes"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="promptDialogVisible = true">提示</el-button>
      </el-col>
    </el-row>
    <MdEditor class="editor"
              editorId="editorId"
              @onUploadImg="uploadImage"
              @onSave="save"
              :showToolbarName="showBar"
              :tabWidth="tab"
              style="height: 800px"
              :show-code-row-number="false"
              v-model="noteMode.content"
              :theme="noteMode.theme"
              :toolbars-exclude="exclude"
              :previewTheme="noteMode.previewTheme"
              :code-theme="noteMode.codeTheme"/>

    <el-row style="margin-top: 20px">
      <el-col style="display: flex;justify-content: center;align-items: center" :span="2">
        文章封面
      </el-col>
      <el-col :span="22">
        <el-upload
            class="avatar-uploader"
            :action="UP_LOAD_URL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="head"
        >
          <img v-if="noteMode.coverSrc" :src="noteMode.coverSrc" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="4">
        <div class="m-4" style="margin-top: 20px">
          <el-select
              v-model="noteMode.blogSort"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="选择你的分类"
              style="width: 150px"
          >
            <el-option
                v-for="item in blogSortList"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="m-4" style="margin-top: 20px">
          <el-select
              v-model="noteMode.classificationId"
              placeholder="选择文章分类夹"
              style="width: 150px"
          >
            <el-option
                v-for="item in classificationList"
                :key="item.classificationId"
                :label="item.classificationTitle"
                :value="item.classificationId"
            />
          </el-select>
          <el-button style="margin-left: 20px" @click="addNewClassificationDialog = true">
            创建新的
          </el-button>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="m-4" style="margin-top: 20px">
          <el-select
              v-model="noteMode.tagId"
              placeholder="选择你的标签"
              style="width: 200px"
          >
            <el-option
                v-for="item in tagList"
                :key="item.tagId"
                :label="item.tagName"
                :value="item.tagId"
            />
          </el-select>
          <el-button style="margin-left: 20px" @click="addNewTagDialog = true">
            创建新的
          </el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="m-4" style="margin-top: 20px">
          <el-radio-group v-model="noteMode.blogPrivate">
            <el-radio label="1" size="large">公开</el-radio>
            <el-radio label="0" size="large">私有</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="m-4" style="margin-top: 20px">
          <el-button @click="push">发布</el-button>
          <el-button @click="onlySave">草稿</el-button>
        </div>
      </el-col>
    </el-row>

  </el-card>

  <el-dialog v-model="promptDialogVisible" title="Tips" width="30%" draggable>
    <span>一些使用说明</span>
    <h4>1. Ctrl s保存文章为草稿</h4>
    <h4>2. 可以直接复制图片，然后在文本区域内Ctrl v粘贴，即可快速上传</h4>
    <h4>3. 美化功能暂时不可用，请耐心等待修复</h4>
    <h4>4. 可以使用html标签及css来进行布局</h4>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="promptDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="promptDialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addNewTagDialog" title="标签" width="30%" draggable>
    <el-card shadow="never">
      <el-input v-model="tagModel.tagName" placeholder="请输入标签名称"/>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelAddTag">取消</el-button>
        <el-button type="primary" @click="confirmAddTag">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addNewClassificationDialog" title="分类夹" width="30%" draggable>
    <el-card shadow="never">
      <el-input v-model="classificationModel.classificationTitle" placeholder="请输入分类夹名称"/>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelAddClassification">取消</el-button>
        <el-button type="primary" @click="confirmAddClassification">
          创建
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped>
.article-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.article-header-title {
  margin-right: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: red;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>