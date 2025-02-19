import User from './user'

export interface AuthContextType {
    user: User | null
    login: () => Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}
