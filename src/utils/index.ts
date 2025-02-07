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
