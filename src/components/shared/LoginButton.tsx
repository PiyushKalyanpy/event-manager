'use client'

import {
    Avatar,
    Button,
    CircularProgress,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@heroui/react'

import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const router = useRouter()
    const { user, login, logout, isLoading } = useAuth()

    const handleLogin = () => {
        login()
    }
    if(isLoading){
        return <p><CircularProgress/></p>
    }

    if (user) {
        return (
            <div>
            
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                    <Avatar name={user.name} src={user.photoURL} />

                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={(key) => {
                            if (key === 'logout') {
                                logout()
                            }
                            if (key === 'dashboard') {
                                router.push('/admin')
                            }
                            if (key === 'my-tickets') {
                                router.push('/my-tickets')
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
                        <DropdownItem key="my-tickets">My Tickets</DropdownItem>
                        <DropdownItem
                            onPress={logout}
                            key="logout"
                            color="danger"
                        >
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
                onPress={login}
                color="primary"
                // isLoading={isLoading}
                // isDisabled={isLoading}
            >
                Login
            </Button>
        </div>
    )
}

export default LoginButton
