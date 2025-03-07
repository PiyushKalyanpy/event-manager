'use client'

import { Chip, Tooltip, User } from '@heroui/react'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/table'

import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'
import { useTicket } from '@/hooks/useTicket'

export const columns = [
    { name: 'NAME', uid: 'name' },
    // { name: 'EMAIL', uid: 'email' },
    { name: 'CODE', uid: 'secureCode' },
    { name: 'STATUS', uid: 'status' },
    // { name: 'ACTIONS', uid: 'actions' },
]

const statusColorMap = {
    Scanned: 'success',
    paused: 'danger',
    Booked: 'default',
}

const EventAttendees = () => {
    const { eventTickets, getTicketByEventId } = useTicket()
    const { selectedEvent } = useEvent()
    const { user } = useAuth()

    if (!selectedEvent) {
        return <div className="page-wrapper">No event selected</div>
    }

    useEffect(() => {
        if (eventTickets.length === 0) {
            console.log('No tickets found for this event')
            getTicketByEventId(selectedEvent.id)
        }
        console.log(selectedEvent)
    }, [])

    console.log(eventTickets)

    const renderCell = React.useCallback((ticket, columnKey) => {
        const cellValue = ticket[columnKey]

        switch (columnKey) {
            case 'name':
                return (
                    <User
                        avatarProps={{
                            radius: 'lg',
                            src: ticket.user.photoURL,
                        }}
                        description={ticket.user.email}
                        name={ticket.user.name}
                    >
                        {ticket.user.name}
                    </User>
                )
            case 'secureCode':
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                    </div>
                )
            case 'status':
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[ticket.status]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                )
            // case 'actions':
            //     return (
            //         <div className="relative flex items-center gap-2">
            //             <Tooltip content="Details">
            //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            //                     <EyeIcon />
            //                 </span>
            //             </Tooltip>
            //             <Tooltip content="Edit user">
            //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            //                     <EditIcon />
            //                 </span>
            //             </Tooltip>
            //             <Tooltip color="danger" content="Delete user">
            //                 <span className="text-lg text-danger cursor-pointer active:opacity-50">
            //                     <DeleteIcon />
            //                 </span>
            //             </Tooltip>
            //         </div>
            //     )
            // default:
            //     return cellValue
        }
    }, [])

    return (
        <div className="w-full h-full p-8">
            <div>
   
                <Table className="bg-black/60">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={'start'}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={eventTickets}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item.data, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default EventAttendees
