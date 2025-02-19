'use client'

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth, db } from '@/firebase'
import { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { AuthContextType } from '@/types/auth'
import { TUser } from '@/types/user'
import { handleError } from '@/utils/errorHandler'
import { useRouter } from 'next/navigation'

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({ children }: any) {
    const [user, setUser]: any = useState()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router  = useRouter()

    useEffect(() => {
        setIsLoading(true)
        async function unsub() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    getUser(user).then((data) => {
                        console.log(data , "data: ")
                        setUser(data)
                        setIsLoading(false)
                        if(data==null) {
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
            handleError(err)
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

const getUser = async (user: any) => {
    const userRef = doc(db, 'users', user.uid)
    const dbUser = await getDoc(userRef)
    console.log('5')
    if (dbUser.exists()) {
        return dbUser.data()
    }
    return null
}

const createUser = async (user: any) => {
    if (user) {
        try {
            const newUser: TUser = {
                uid: user.uid,
                name: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || '',
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            const userRef = doc(db, 'users', user.uid)
            setDoc(userRef, newUser)
        } catch (err) {
            handleError(err)
        }
    }
}
