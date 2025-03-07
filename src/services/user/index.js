'use client'

import { auth, db } from '@/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const getUserById = async (userId) => {
    const userRef = doc(db, 'users', userId)
    const dbUser = await getDoc(userRef)
    if (dbUser.exists()) {
         return dbUser.data()
    }
    return null
}

export const createUser = async (user) => {
    if (user) {
        try {
            const userRef = doc(db, 'users', user.uid)
            const newUser = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            await setDoc(userRef, newUser)
        } catch (err) {
            console.log(err)
        }
    }
}
