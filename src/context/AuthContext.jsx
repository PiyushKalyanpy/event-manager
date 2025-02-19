import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth, db } from '@/firebase'
import { createContext, useContext, useEffect, useState } from 'react'
import { createUser, getUserById } from '@/services/user'

import { useRouter } from 'next/navigation'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        async function unsub() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('User is signed in:', user)
                    getUserById(user.uid).then((data) => {
                        console.log(data, 'data: ')
                        
                        setUser(data)
                        setIsLoading(false)
                        if (data == null) {
                            createUser(user)
                        }
                    })
                } else {
                    setUser(null)
                    setIsLoading(false)
                }
            })
        }
        unsub()
    }, [])

    const login = async () => {
        setIsLoading(true)
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            await signOut(auth)
            router.push('/login')
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
