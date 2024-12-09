'use client'

import { Button } from '@nextui-org/react'
import Loading from '@/components/shared/Loading'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
    const { login, isLoading, user }: any = useAuth()
    const router = useRouter()

    if (isLoading) {
        return <Loading />
    }
    if (user) {
        router.push('/dashboard')
    }

    return (
        <div className="w-screen h-screen flex items-center   justify-center flex-col gap-4 ">
            <div className="flex gap-4 flex-col">
                {user && user.email}
                <Button
                    onClick={login}
                    variant="shadow"
                    isLoading={isLoading}
                    color="primary"
                >
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default AuthPage
