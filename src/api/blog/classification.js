import request from "../../util/request.js";

export function getList() {
    return request({
        url: "/blog/classification/getList",
        method: "GET"
    })
}

export function addClassification(classificationDto) {
    return request({
        url: "/blog/classification/addOrUpdateClassification",
        method: "POST",
        data: classificationDto
    })
}

export function getListById(id) {
    return request({
        url: `/blog/classification/getListById/${id}`,
        method: "GET"
    })
}

export function updateTitle(dto) {
    return request({
        url: "/blog/classification/updateTitle",
        method: "PUT",
        data: dto
    })
}