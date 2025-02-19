import { Button } from '@nextui-org/react'
import LoginButton from '@/components/shared/LoginButton'
import { useAuth } from '@/hooks/useAuth'

const Profile = () => {
    const { user, logout }: any = useAuth()

    return (
        <div className="p-8 w-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <LoginButton />
                    <span>{user && user.name}</span>
                    {user && user.email}
                </div>

                <div className="w-full">
                    
                    <Button onPress={logout} color='danger' variant='bordered' className='w-full'>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile
