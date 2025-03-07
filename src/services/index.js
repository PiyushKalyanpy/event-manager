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

export     const createGaugeData = (value, max, warning, danger) => [
    { name: 'Normal', value: Math.min(warning, value), color: '#22c55e' },
    {
        name: 'Warning',
        value: value > warning ? Math.min(danger, value) - warning : 0,
        color: '#f59e0b',
    },
    {
        name: 'Danger',
        value: value > danger ? value - danger : 0,
        color: '#ef4444',
    },
    {
        name: 'Remaining',
        value: Math.max(0, max - value),
        color: '#e5e7eb20',
    },
]
