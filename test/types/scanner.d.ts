export type Scanner = {
    id: string
    eventId: string
    userId: string
    scannedBy : {
        name: string
        email: string
        photoURL: string
        id : string
    }, 
    ticketId: string
    scannedAt: string
}