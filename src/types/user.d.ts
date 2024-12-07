export interface TUser {
    uid: string
    name: string
    email: string
    photoURL: string
    role: 'user' | 'admin' | 'manager'
    createdAt: string
    updatedAt: string
}
