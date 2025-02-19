import Image from 'next/image'
import { X } from 'lucide-react'

const InValidCard = ({ user }: any) => {
    return (
        <div className="h-16  bg-red-800/20 rounded-2xl p-2 flex gap-4   text-white">
            <div className="bg-red-600/20 items-center justify-center flex w-12 h-12 rounded-3xl">
                <X color="red" />
            </div>
            <div className="flex flex-col">
                <h1 className="text-white text-ellipsis line-clamp-1 font-bold">
                    Invalid Code
                </h1>
                <p className="text-red-400 text-sm text-ellipsis line-clamp-1">
                    this user is not registered
                </p>
            </div>
        </div>
    )
}

export default InValidCard
