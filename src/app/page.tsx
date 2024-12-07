'use client'

import Image from 'next/image'
import Loading from '@/components/shared/Loading'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const { user, isLoading }: any = useAuth()

    if (isLoading) {
        return <Loading />
    }
    if (!user) {
        router.push('/login')
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[url('/gradient.svg')] bg-cover bg-top  ">
            Hello Piyush {user && user.email} {user && user.displayName}
        </div>
    )
}
