export enum Status {
    UPCOMING = 'Upcoming',
    COMPLETED = 'Completed',
    ONGOING = 'Ongoing',
}

export const formatDateTime = (utcTime: any) => {
    const istTime = new Date(utcTime).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
    })

    return istTime
}

export function compressImage(file: any, maxSizeInMB = 0.9) {
    return new Promise((resolve, reject) => {
        const img: any = new Image()
        const reader = new FileReader()

        reader.onload = (event: any) => {
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx: any = canvas.getContext('2d')

                const maxWidth = 1024
                const maxHeight = 1024
                let width = img.width
                let height = img.height

                if (width > maxWidth || height > maxHeight) {
                    const scale = Math.min(maxWidth / width, maxHeight / height)
                    width = width * scale
                    height = height * scale
                }

                canvas.width = width
                canvas.height = height

                ctx.drawImage(img, 0, 0, width, height)

                let quality = 0.82

                const maxSize = maxSizeInMB * 1024 * 1024
                let compressedDataUrl = canvas.toDataURL('image/jpeg', quality)

                while (
                    dataUrlToBlob(compressedDataUrl).size > maxSize &&
                    quality > 0.1
                ) {
                    quality -= 0.05
                    compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
                }

                const byteString = atob(compressedDataUrl.split(',')[1])
                const arrayBuffer = new ArrayBuffer(byteString.length)
                const uint8Array = new Uint8Array(arrayBuffer)

                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i)
                }

                const compressedFile = new Blob([uint8Array], {
                    type: 'image/jpeg',
                })
                resolve(compressedFile)
            }
            img.src = event.target.result
        }

        reader.onerror = (error) => reject(error)

        reader.readAsDataURL(file)
    })
}

export function dataUrlToBlob(dataUrl: any) {
    const parts = dataUrl.split(',')
    const byteString = atob(parts[1])
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
    }

    return new Blob([uint8Array], { type: 'image/jpeg' })
}
