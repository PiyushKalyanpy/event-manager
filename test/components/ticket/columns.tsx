'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Checkbox } from '@/components/ui/checkbox'
import Chip from '../shared/MChip'
import { ColumnDef } from '@tanstack/react-table';
import { formatDateTime } from '@/utils'

type Ticket = {
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

export const columns: ColumnDef<Ticket, any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'photoURL',
        accessorFn: (row) => row.user.photoURL,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Photo
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[200px] truncate font-medium">

                <Avatar>
  <AvatarImage src={row.getValue('photoURL')} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

                </span>
            </div>
        ),
    },
    {
        accessorKey: 'name',
        accessorFn: (row) => row.user.name,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue('name')}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        accessorFn: (row) => row.user.email,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue('email')}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'ticketType',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Ticket Type
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue('user')}

                    {row.getValue('ticketType') === 'VIP' ? (
                        <Chip
                            label={row.getValue('ticketType')}
                            variant="vip"
                        />
                    ) : (
                        <div>
                            <span className="text-red-500">
                                <Chip
                                    label={row.getValue('ticketType')}
                                    variant="general"
                                />
                            </span>
                        </div>
                    )}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Scanned
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue('status') === 'Booked' && (
                        <Chip
                            label={row.getValue('status')}
                            variant="general"
                        />
                    )}

                    {row.getValue('status') === 'Scanned' && (
                        <Chip
                            label={row.getValue('status')}
                            variant="scanned"
                        />
                    )}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'purchaseTime',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Purchase Time
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {formatDateTime(row.getValue('purchaseTime'))}
                </span>
            </div>
        ),
    },
]
