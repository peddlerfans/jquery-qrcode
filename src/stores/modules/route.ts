import { defineStore } from 'pinia'

interface RouteInfo {
    isEmbedded: boolean
}

export const RouteInfo = defineStore({
    id: 'RouteInfo',
    state: (): RouteInfo => ({
        isEmbedded: false
    }),
    getters: {
        getIsEmbedded: state => state.isEmbedded
    },
    actions: {
        setEmbedded(flag: boolean) {
            this.isEmbedded = flag
        }
    }
})