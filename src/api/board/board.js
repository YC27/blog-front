import request from "../../util/request.js"

export function sendMsg(content) {
    return request({
        url: "/user/sendMsg",
        method: "POST",
        data: content
    })
}

export function getList() {
    return request({
        url: "/user/getBoardList",
        method: "GET",
    })
}