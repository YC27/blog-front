import { ElMessage, ElMessageBox } from 'element-plus'

// 普通信息提示
export const infoMsg = (msgInfo) => {
    ElMessage({
        type: 'info',
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: msgInfo,
    })
}

// 成功提示
export const successMsg = (msgInfo) => {
    ElMessage({
        type: 'success',
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: msgInfo,
    })
}

// 错误提示
export const errorMsg = (msgInfo) => {
    ElMessage({
        type: 'error',
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: msgInfo,
    })
}

// 警告提示
export const warnMsg = (msgInfo) => {
    ElMessage({
        type: 'warning',
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: msgInfo,
    })
}