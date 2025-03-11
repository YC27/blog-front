import {defineStore} from "pinia";
import {ref} from "vue";

export const usePkStore = defineStore("pk", () => {
        const winner = ref("")
        const showColor = ref()
        const game = ref(null)
        const socket = ref(null)
        const event = ref("")

        return {
            winner,
            showColor,
            game,
            socket
        }
    },
    {
        persist: true
    })