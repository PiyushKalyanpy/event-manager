'use client'

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const router = useRouter()
    const { user, handleSignInWithGoogle, isLoading, logout }: any =
        useAuth()

    if (user) {
        return (
            <div>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src={user?.photoURL}
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={(key) => {
                            if (key === 'logout') {
                                logout()
                            }
                            if (key === 'dashboard') {
                                router.push('/dashboard')
                            }
                            if (key === 'my_events') {
                                router.push('/events/me')
                            }
                        }}
                        aria-label="Profile Actions"
                        variant="flat"
                    >
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{user?.email}</p>
                        </DropdownItem>
                        {user.isAdmin && (
                            <DropdownItem key="dashboard">
                                Dashboard
                            </DropdownItem>
                        )}
                        <DropdownItem key="my_events">My Events</DropdownItem>
                        <DropdownItem onClick={logout} key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }

    return (
        <div className=" ">
            <Button
                onClick={handleSignInWithGoogle}
                color="primary"
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                Login
            </Button>
        </div>
    )
}

export default LoginButton
