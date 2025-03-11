import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
        const user = ref({
            userId: null,
            username: "",
            nickname: "",
            email: "",
            token: "",
            avatar: "",
            isLogin: false
        })
        const setNickname = (nick) => {
            user.value.nickname = nick
        }

        const setAvatar = (ava) => {
            user.value.avatar = ava
        }

        const setIsLogin = () => {
            user.value.isLogin = true
        }
        const setUser = (loginUser) => {
            user.value = loginUser
        }

        const logout = () => {
            user.value = {
                userId: null,
                username: "",
                nickname: "",
                email: "",
                token: "",
                avatar: "",
                isLogin: false
            }
        }

        return {
            user,
            setUser,
            logout,
            setAvatar,
            setNickname,
            setIsLogin
        }
    },
    {
        persist: true
    })