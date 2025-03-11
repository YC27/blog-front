import request from "../../util/request.js"

export function login(user) {
    return request({
        url: "/user/login",
        method: "POST",
        data: user
    })
}

export function register(user) {
    return request({
        url: "/user/register",
        method: "POST",
        data: user
    })
}

export function _updateAvatar(avatarDTO) {
    return request({
        url: "/user/updateAvatar",
        method: "PUT",
        data: avatarDTO
    })
}

export function _updatePassword(passwordDTO) {
    return request({
        url: "/user/updatePassword",
        method: "PUT",
        data: passwordDTO
    })
}

export function _updateNickname(nicknameDTO) {
    return request({
        url: "/user/updateNickname",
        method: "PUT",
        data: nicknameDTO
    })
}

export function test() {
    return request({
        url: "/user/test",
        method: "GET"
    })
}

export function show() {
    return request({
        url: "/user/show",
        method: "GET"
    })
}

export function getUser(id) {
    return request({
        url: `/user/getUser/${id}`,
        method: "GET"
    })
}
