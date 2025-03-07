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

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const router = useRouter()
    const { user, login, logout, isLoading } = useAuth()

    if (isLoading) {
        return (
            <p>
                <CircularProgress />
            </p>
        )
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
                            if (key === 'home') {
                                router.push('/home')
                            }
                        }}
                        aria-label="Profile Actions"
                        variant="flat"
                        className="flex flex-col gap-3 bg-black rounded-2xl"
                    >
                        <DropdownItem key="profile" className="h-14 gap-2 ">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{user?.email}</p>
                        </DropdownItem>
                        {user.isAdmin && (
                            <DropdownItem className="p-4" key="dashboard">
                                Dashboard
                            </DropdownItem>
                        )}
                        <DropdownItem className="p-4 " key="home">
                            Home
                        </DropdownItem>
                        <DropdownItem className="p-4 " key="my-tickets">
                            My Tickets
                        </DropdownItem>
                        <DropdownItem
                            onPress={logout}
                            key="logout"
                            className="p-4"
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
            <Button onPress={login} color="primary">
                Login
            </Button>
        </div>
    )
}

export default LoginButton
