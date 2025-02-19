import { Check } from 'lucide-react'
import Image from 'next/image'

const ValidCard = ({ userz }: any) => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        imageURL:
            'https://cdn.dribbble.com/userupload/18423218/file/original-f664026b762b844a40579a4714872eed.png?format=webp&resize=400x300&vertical=center',
    }
    return (
        <div className="h-16  bg-emerald-600/20 gap-4 flex items-center p-2 rounded-2xl text-black">
            <div className="bg-emerald-600/20 items-center justify-center flex w-12 h-12 rounded-3xl">
                <Check color='green' />
            </div>
            {user && (
                <div className="flex gap-2 items-center">
                    <Image
                        src={user.imageURL}
                        width={40}
                        height={40}
                        alt="logo"
                        className="object-cover w-10 h-10  rounded-xl"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-white text-ellipsis line-clamp-1 font-bold">
                            {user.name}
                        </h1>
                        <p className="text-white text-sm text-ellipsis line-clamp-1">
                            {user.email}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ValidCard
