import Image from 'next/image'

const MiniEventCard = ({ event }: any) => {
    return (
        <div className="flex gap-4 items-center bg-neutral-900 p-2 rounded-xl">
            <Image
                src={`${event.imageURL}`}
                width={80}
                height={80}
                alt="logo"
                className="object-cover w-16 h-12  rounded-xl"
            />
            <div className="flex flex-col items-start">
                <h1 className="text-white text-ellipsis line-clamp-1 font-bold">
                    {event.name}
                </h1>
                <p className="text-white text-sm text-ellipsis line-clamp-1">
                    {event.venue}
                </p>
            </div>
        </div>
    )
}

export default MiniEventCard
