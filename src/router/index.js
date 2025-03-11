import { createRouter, createWebHistory } from "vue-router"

// import Login from "../view/login/login.vue"
// import Register from "../view/register/register.vue"
// import Index from "../view/index/index.vue"
// import Blog from "../view/blog/blog.vue"
// import Chat from "../view/chat/chat.vue"
// import Info from "../view/info/info.vue"
// import Board from "../view/board/board.vue";
// import PK from "../view/pk/pk.vue"
// import Notfound from "../view/notfound.vue";

const Login = () => import('../view/login/login.vue')
const Index = () => import('../view/index/index.vue')
const Blog = () => import('../view/blog/blog.vue')
const Chat = () => import('../view/chat/chat.vue')
const Info = () => import('../view/user/info.vue')
const PK = () => import('../view/pk/pk.vue')
const Notfound = () => import('../view/notfound.vue')
const Register = () => import('../view/register/register.vue')
const Board = () => import('../view/board/board.vue')
const Show = () => import('../view/blog/show.vue')
const Space = () => import('../view/user/space.vue')
const Classification = () => import('../view/user/classification.vue')

const routes = [
    {
        path: "/",
        redirect: "index",
        component: Index,
    },
    {
        path: "/index",
        name: "index",
        component: Index,
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/blog",
        name: "blog",
        component: Blog
    },
    {
        path: "/show",
        name: "show",
        component: Show
    },
    {
        path: "/classification",
        name: "classification",
        component: Classification
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: Notfound,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
    },
    {
        path: '/board',
        name: 'board',
        component: Board,
    },
    {
        path: '/pk',
        name: 'pk',
        component: PK,
    },
    {
        path: '/info',
        name: 'info',
        component: Info,
    },
    {
        path: '/space',
        name: 'space',
        component: Space,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/notfound'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router