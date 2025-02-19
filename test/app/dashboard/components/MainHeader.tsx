'use client'

import AppBreadcrumb from './AppBreadcrumb'
import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MainHeader = (props: any) => {
    const { label, actionLabel, actionIcon, actionLink }: any = props

    const router = useRouter()
    const onAction = () => {
        router.push(actionLink)
    }

    return (
        <div className="flex justify-between h-28 w-full  bg-[url('/gradient.svg')] bg-no-repeat p-4 content-center items-center ">
            <h1 className=" text-3xl font-bold"> {label}</h1>
            {actionLabel && (
                <Button
                    onClick={onAction}
                    color="primary"
                    startContent={<props.actionIcon color="black" />}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

export default MainHeader
