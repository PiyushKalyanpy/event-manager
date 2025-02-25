'use client'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/firebase'

export const uploadImage = async (image) => {
    try {
        const imageRef = ref(storage, `events/${image.name}`)
        await uploadBytes(imageRef, image)
        const imageURL = await getDownloadURL(imageRef)
        return imageURL
    } catch (err) {
        handleError(err)
    }
}
