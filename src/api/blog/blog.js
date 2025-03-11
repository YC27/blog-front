import request from "../../util/request.js";

export function addOrUpdate(blog) {
    return request({
        url: "/blog/article/addOrUpdateArticle",
        method: "POST",
        data: blog
    })
}

export function getArticleById(id) {
    return request({
        url: `/blog/article/getArticleById/${id}`,
        method: "GET"
    })
}

export function getBlogList(blogPage) {
    return request({
        url: "/blog/article/getList",
        method: "POST",
        data: blogPage
    })
}

export function deleteById(id) {
    return request({
        url: `/blog/article/deleteById/${id}`,
        method: "DELETE"
    })
}