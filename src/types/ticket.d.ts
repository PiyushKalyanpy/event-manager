export type Ticket = {
    id: string
    eventId: string
    userId: string
    status: 'Booked' | 'Cancelled' | 'Used'
    user: {
        name: string
        email: string
        photoURL: string
    }
    ticketType: 'VIP' | 'General'
    price: number
    purchaseTime: string
    secureCode: string
    createdAt: string
    scannedAt?: string | null
}
