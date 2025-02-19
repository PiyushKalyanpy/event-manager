'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Avatar } from '@heroui/react'
import Chip from '../shared/MChip'
import MChip from '../shared/MChip'
import { useEffect } from 'react'
import { useTicket } from '@/hooks/useTicket'

const TicketTable = () => {
    const { eventTickets } = useTicket()
    console.log(eventTickets)
    return (
        <div className="p-4">
            <Table className=" p-8">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Purchased At</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>User Id</TableHead>
                        <TableHead>Ticket Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* make the cell accordinf to the data ticket  */}
                    {eventTickets &&
                        eventTickets.map((ticket: any) => (
                            <TableRow className="    " key={ticket.id}>
                                <TableCell className="flex items-center gap-4">
                                    <Avatar src={ticket.user.photoURL} />
                                    {ticket.user.name}
                                </TableCell>
                                <TableCell>{ticket.user.email}</TableCell>
                                <TableCell>
                                    <span>
                                        {new Date(
                                            ticket.purchaseTime
                                        ).toLocaleString()}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {ticket.ticketType === 'VIP' ? (
                                        <Chip
                                            label={ticket.ticketType}
                                            variant="vip"
                                        />
                                    ) : (
                                        <div>
                                            <span className="text-red-500">
                                                <Chip
                                                    label={ticket.ticketType}
                                                    variant="general"
                                                />
                                            </span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {/* show userid like aasd....asd */}
                                    {ticket.userId.slice(0, 5)}...{' '}
                                    {ticket.userId.slice(-3)}
                                </TableCell>
                                <TableCell>
                                    {/* show event id like aasd....asd */}
                                    {ticket.id.slice(0, 5)}...{' '}
                                    {ticket.id.slice(-3)}
                                </TableCell>
                                <TableCell>
                                    {ticket.status === 'Booked' && (
                                        <Chip
                                            label={ticket.status}
                                            variant="general"
                                        />
                                    )}

                                    {ticket.status === 'Scanned' && (
                                        <Chip
                                            label={ticket.status}
                                            variant="scanned"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                    {ticket.price}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TicketTable
