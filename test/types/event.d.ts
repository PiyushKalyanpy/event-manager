export interface Event {
    id?: string
    name: string
    description: string
    date: string
    time: string
    venue: string
    status: string
    isLive: boolean
    tickets: {
        sold: number
        capacity: number
        revenue: number
    }
    metrics: {
        attendees: number
        feedback: number
    }
    price: {
        general: number
        vip: number
    }
    organiser: {
        name: string
        photoURL: string
        email: string
    }
    imageURL: string
    createdAt: string
    updatedAt: string
}
