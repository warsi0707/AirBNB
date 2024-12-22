import {atom, selector} from "recoil"

export const usernameAtom = atom({
    key: "username",
    default: ""
})
export const passwordAtom = atom({
    key: "password",
    default: ""
})
export const emaildAtom = atom({
    key: "email",
    default: ""
})
export const messageAtom = atom({
    key: "message",
    default: ""
})
export const errorAtom = atom({
    key: "error",
    default: ""
})
export const loadingAtom = atom({
    key: "loading",
    default: true
})
export const authenticatedAtom = atom({
    key: "authentication",
    default: false
})
export const authenticatedSelector = selector({
    key: "authenticatedSelector",
    get: ({get})=>{
        const isAuthenticated= get(authenticatedAtom)
        if(isAuthenticated){
            return true
        }else return false
    }
})
export const userMenuAtom = atom({
    key: "userMenuAtom",
    default: false
})

export const userAtom = atom({
    key: "userAtom",
    default: ""
})
export const userEmailAtom =atom({
    key: "userEmailAtom",
    default: ""
})
export const listingAtom = atom({
    key: "listingAtom",
    default: {}
})
export const ownerAtom = atom({
    key: "ownerAtom",
    default: ""
})

