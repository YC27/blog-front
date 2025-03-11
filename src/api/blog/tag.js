import request from "../../util/request.js";

export function getList() {
    return request({
        url: "/blog/tag/getList",
        method: "GET"
    })
}

export function addTag(tagDto) {
    return request({
        url: "/blog/tag/addOrUpdateTag",
        method: "POST",
        data: tagDto
    })
}