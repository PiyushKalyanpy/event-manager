import { toast } from 'react-toast'

export const handleError = (error: any) => {
    if (error && error.message) {
        toast.error(error.message)
    } else {
        toast.error('An unexpected error occurred.')
    }
    console.error(error)
}

export class EventErrors extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name

        // if (Error.captureStackTrace) {
        //   Error.captureStackTrace(this, this.constructor);
        // }
        toast.error('hello')
    }
}
