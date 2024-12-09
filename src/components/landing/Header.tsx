import Image from 'next/image'
import Link from 'next/link'
import LoginButton from '../shared/LoginButton'

const Header = () => {
    return (
        <div className="flex    w-screen top-0 bg-neutral-950/70 z-10 backdrop-blur-md border-neutral-900 border-b  justify-between items-center p-4 sticky  ">
            <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="logo"
                className="w-16  "
            />
            <nav className="py-2 px-4 rounded-full flex gap-12  bg-neutral-700/30 border border-neutral-800">
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="relative hover:text-white group"
                    >
                        <p className="z-20"> {link.name}</p>
                        <span className="absolute bottom-0 left-0 w-0 rounded-full h-[2px] bg-primary shadow-md shadow-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>

            <LoginButton />
        </div>
    )
}

const navLinks = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Events',
        href: '/events',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
    {
        name: 'Pricing',
        href: '/pricing',
    },
]

export default Header
